import os
import typing
import subprocess
import xml.etree.ElementTree as ET

from ai.extracted_char import ExtractedChar


def parse_pdf(pdf_path: str) -> typing.List[ExtractedChar]:
  result = subprocess.run(["pdf2txt.py", "-t", "xml", pdf_path], capture_output=True)
  root = ET.fromstring(result.stdout)
  text = []
  for char in root.iter('text'):
    # We extract the data for the clustering step
    # bbox: X_up_left, Y_up_left, X_down_right, Y_down_right
    # Notice that characters are extracted in consecutive order top to bottom,
    # left to right. This is not enough to parse superior text structures
    # but we can infer the format of the bounding box: first value keep
    # altering while the second one is constant. That is, we are extracting line
    # by line, so the second value must be the Y for chars located one after
    # the other
    if not char.attrib or not char.text:
      # Discard noisy chars
      continue
    x_tl, y_tl, x_br, y_br = [float(coord) for coord in char.attrib['bbox'].split(',')]
    c = ExtractedChar(
      char.text, char.attrib['size'], char.attrib['font'],
      x_tl, y_tl, x_br, y_br
    )
    text.append(c)
  return text


def docx_to_pdf(folder, source, timeout=None):
    args = ['libreoffice', '--headless', '--convert-to', 'pdf', '--outdir', folder, source]
    process = subprocess.run(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=timeout)
    return os.path.join(folder, f"{source.rsplit('.', maxsplit=1)[0]}.pdf")