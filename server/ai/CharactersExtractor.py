import aiofiles
import typing
import os
import subprocess
import xml.etree.ElementTree as ET

from fastapi import UploadFile
from ai.ExtractedChar import ExtractedChar
from generics import Singleton


class CharactersExtractor(metaclass=Singleton):
    async def extract_document_characters(
        self,
        file: UploadFile,
    ) -> typing.List[ExtractedChar]:
        file_location = f"{file.filename}"
        async with aiofiles.open(file_location, "wb") as out_file:
            content = await file.read()
            await out_file.write(content)

        result = subprocess.run(
            ["pdf2txt.py", "-t", "xml", file_location], capture_output=True
        )
        root = ET.fromstring(result.stdout)
        text = []
        for char in root.iter("text"):
            if not char.attrib or not char.text:
                continue
            x_tl, y_tl, x_br, y_br = [
                float(coord) for coord in char.attrib["bbox"].split(",")
            ]
            c = ExtractedChar(
                char.text,
                char.attrib["size"],
                char.attrib["font"],
                x_tl,
                y_tl,
                x_br,
                y_br,
            )
            text.append(c)

        os.remove(file_location)
        return text
