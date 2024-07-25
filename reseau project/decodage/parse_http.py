from typing import Union


def parse_http(stream: bytes) -> Union[dict, None]:
    ligne = ""
    result: dict = {}
    pos = 0
    i: bytes
    for i in stream[0:134]:
        if int(hex(i), base=16) >= 128:
            return None
    if stream[0:4].decode('ASCII') == "HTTP":
        result["Type"] = "reponse"
        result["reponse version"] = stream[0:8].decode('ASCII')
        result["Status code"] = stream[8:12].decode('ASCII')
        result["Response phrase"] = stream[12:15].decode('ASCII')
        return result
    else:
        while pos < len(stream)-1 and int(bin(stream[pos+1]), base=2) != 10 and int(bin(stream[pos]), base=2) != 13:
            ligne += chr(stream[pos])
            pos += 1
        if (len(stream)-1 > pos):
            result["Type"] = "requete"
            liste: list = ligne.split(" ")
            result["URI"] = "{0} {1}".format(liste[0], liste[1])
            result["Version"] = liste[2]
            return result
    return None


def print_HTTP(http_dic: dict, silent: bool = True) -> str:
    result: str = ""
    for key, value in http_dic.items():
        result += f"{key}:{value}\n"
        if not silent:
            print(result)
    return result
