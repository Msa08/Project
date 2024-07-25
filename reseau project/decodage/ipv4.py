from utils import generate_ip_options, generate_ip_protocols


def print_IP4(ip_dic: dict, silent: bool = True) -> str:
    ip_options: dict = generate_ip_options()
    ip_protocols: dict = generate_ip_protocols()
    result: str = ""
    for key, val in ip_dic.items():
        if key == "protocol":
            result += f"{key}: {val} ({[str(val)]})\n"
        elif key == "options":
            result += f"{key}:\n"
            for option in val:
                for curr_opt_key, curr_opt_val in option.items():
                    if curr_opt_key != "type":
                        result += f"\t{curr_opt_key}:{curr_opt_val}\n"
                    else:
                        result += f"\t{curr_opt_key}:{curr_opt_val} ({ip_options[str(curr_opt_val)]})\n"
                result += "\t-----\n"
        else:
            result += f"{key}: {val}\n"
        if not silent:
            print(result)
    return result


def parse_IP_adress(stream: bytes) -> list:
    bin_ip: list = [int(bin(stream[i]), base=2) for i in range(0, 4)]
    return bin_ip


def parse_IP_options(type: int, stream: bytes):
    # TODO: complete option parsing
    if type == 7:
        return [parse_IP_adress(stream[i:i+4]) for i in range(0, len(stream)-4, 4)]
    return stream


def parse_ipv4(stream: bytes, start: int = 14) -> dict:
    result: dict = {}
    result["version"] = int(bin(stream[0] >> 4), base=2)
    if result["version"] != 4:
        raise Exception("unsupported version.")
    result["hlen"] = int(bin(stream[0] & 0b00001111), base=2)
    result["DSCP"] = bin(stream[1] >> 2)
    result["ECN"] = bin(stream[1] & 0b00000011)
    result["total length"] = int(bytes.hex(stream[2:4]), base=16)
    result["id"] = int(bytes.hex(stream[4:6]), base=16)
    flags = [stream[6] >> 7, stream[6] >> 6 & 0b01, stream[6] >> 5 & 0b001]
    if flags[0] != 0:
        raise Exception("reserved flag not set to 0.")
    result["flags"] = flags
    result["fragment_offset"] = int(bin(int(bytes.hex(stream[6:8]), base=16)), base=2) & 0b0001111111111111
    result["TTL"] = stream[8]
    result["protocol"] = stream[9]
    result["header_checksum"] = int(bytes.hex(stream[9:11]), base=16)
    # source IP, dest IP to parse
    result["source_IP"] = parse_IP_adress(stream[12:16])
    result["dest_IP"] = parse_IP_adress(stream[16:21])
    result["end"] = start+20
    # options
    if result["hlen"] > 5:
        result["options"] = []
        i: int = 20  # end of dest IP
        while i < len(stream):
            curr_option_dic: dict = {"type": stream[i], "length": stream[i+1], "pointer": stream[i+2]}
            if stream[i] == 0:
                result["options"].append(curr_option_dic)
                break
            curr_option_dic["data"] = parse_IP_options(
                curr_option_dic["type"], stream[i+3:i+3+curr_option_dic["length"]])
            result["options"].append(curr_option_dic)
            i += stream[i+1]
        result["end"] += i

    return result
