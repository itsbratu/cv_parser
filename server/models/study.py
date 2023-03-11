from json import dumps

class Study:
    def __init__(self, institution: str, degree: str, startDate: str, endDate: str):
        self.institution = institution
        self.degree = degree
        self.startDate = startDate
        self.endDate = endDate
        
    def toDict(self) -> dict:
        return {
            "institution": self.institution,
            "degree": self.degree,
            "startDate": self.startDate,
            "endDate": self.endDate,
        }
