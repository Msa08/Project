from utils import generate_ethertypes


def print_ethernet(eth_dic: dict, silent: bool = True) -> str:
    ethertypes: dict = generate_ethertypes()
    result: str = ""
    for key, val in eth_dic.items():
        if key == "EtherType":
            result += f"{key}: {val} ({ethertypes[val]})\n"
        else:
            result += f"{key}: {val}\n"
    if not silent:
        print(result)
    return result


def parse_ethernet(stream: bytes) -> dict:
    result: dict = {}
    result["Destination MAC"] = bytes.hex(stream[:6], ':')
    result["Source MAC"] = bytes.hex(stream[6:12], ':')
    result["EtherType"] = bytes.hex(stream[12:14])
    result["end"] = 14

    return result
