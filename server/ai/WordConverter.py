import subprocess
import aiofiles

from fastapi import UploadFile
from generics import Singleton


class WordConverter(metaclass=Singleton):
    async def convert_to_pdf(self, file: UploadFile):
        path = f"{file.filename}"
        async with aiofiles.open(path, "wb") as out_file:
            content = await file.read()
            await out_file.write(content)
        args = [
            "libreoffice",
            "--headless",
            "--convert-to",
            "pdf",
            "--outdir",
            path,
        ]
        subprocess.run(
            args, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=None
        )
