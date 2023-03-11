from json import dumps

class Section:
    def __init__(self, title: str, content: str):
        self.title = title
        self.content = content
        
    def toDict(self) -> dict:
        return {
            "title": self.title,
            "content": self.content
        }
