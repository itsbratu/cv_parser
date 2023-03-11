from json import dumps

class Job:
    def __init__(self, company: str, position: str, description: str, startDate: str, endDate: str):
        self.company = company
        self.position = position
        self.description = description
        self.startDate = startDate
        self.endDate = endDate
    
    def toDict(self) -> dict:
        return {
            "company": self.company,
            "position": self.position,
            "description": self.description,
            "startDate": self.startDate,
            "endDate": self.endDate,
        }
