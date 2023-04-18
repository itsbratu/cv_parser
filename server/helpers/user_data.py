import typing
from models.user_data import GenericUserFormData
from dateutil.parser import parse

def is_date(string, fuzzy=False):
    try: 
        parse(string, fuzzy=fuzzy)
        return True

    except ValueError:
        return False

def get_user_relevant_information(data: GenericUserFormData) -> typing.List[str]:
    userInformation = []
    for section in data:
        sectionValues = data[section]
        for sectionValue in sectionValues:
            for sectionValueProperty in sectionValue:
                if not is_date(sectionValue[sectionValueProperty]):
                    userInformation.append(sectionValue[sectionValueProperty])
    return userInformation
