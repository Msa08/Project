from utils import generate_tcp_options


def print_TCP(tcp_dic: dict, silent: bool = True) -> str:
    tcp_options: dict = generate_tcp_options()
    result: str = ""
    for key, val in tcp_dic.items():
        if key == "Options":
            result += f"{key}:\n"
            for option in val:
                for curr_opt_key, curr_opt_val, in option.items():
                    if curr_opt_key != "type":
                        result += f"\t{curr_opt_key}:{curr_opt_val}\n"
                    else:
                        result += f"\t{curr_opt_key}:{curr_opt_val} ({tcp_options[str(curr_opt_val)]})\n"
                result += "\t-----\n"
        else:
            result += f"{key}: {val}\n"
        if not silent:
            print(result)
    return result


def parse_tcp_options(type: int, stream: bytes):
    if type == 2:
        return int(bytes.hex(stream), base=16)
    if type == 3:
        return str(int(bytes.hex(stream), base=16)) + " multiply by "+str(2**int(bytes.hex(stream), base=16))
    if type == 5:
        cpt = 0
        liste: list = []
        for i in range(0, len(stream), 4):
            if cpt % 2 == 0:
                liste.append("left edge : "+stream[i:i+4])
            else:
                liste.append("right edge : "+stream[i:i+4])
            cpt += 1
        liste.append("[TCP SACK Count "+len(stream)/2)
        return liste
    if type == 6:
        return stream
    if type == 7:
        return stream
    if type == 8:
        return ["TSval : "+str(int(bytes.hex(stream[0:4]), base=16)), "TSecr : "+str(int(bytes.hex(stream[4:8]), base=16))]
    if type == 10:
        return ["Start_flag : "+int(bin(stream[0] & 0b10000000)), "End_flag : " +
                int(bin(stream[0] & 0b01000000)), "Filler"+int(bin(stream[0] & 0b00111111))]
    if type == 14:
        return stream
    if type == 15:
        return stream


def parse_tcp(stream: bytes, debut: int) -> dict:
    result: dict = {}
    option2 = ""
    result["SPN"] = int(bytes.hex(stream[0:2]), base=16)
    result["DPN"] = int(bytes.hex(stream[2:4]), base=16)
    result["Sequence number"] = int(bytes.hex(stream[4:8]), base=16)
    result["Acknowledgment number"] = int(bytes.hex(stream[8:12]), base=16)
    result["THL"] = int(bin(stream[12] >> 4), base=2)
    result["URG"] = int(bin(stream[13] & 0b00100000), base=2)
    result["ACK"] = int(bin(stream[13] & 0b00010000), base=2)
    result["PSH"] = int(bin(stream[13] & 0b00001000), base=2)
    result["RST"] = int(bin(stream[13] & 0b00000100), base=2)
    result["SYN"] = int(bin(stream[13] & 0b00000010), base=2)
    result["FIN"] = int(bin(stream[13] & 0b00000001), base=2)
    result["Window"] = int(bytes.hex(stream[14:16]), base=16)
    result["Checksum"] = bytes.hex(stream[16:18])
    result["Urgent"] = int(bytes.hex(stream[18:20]), base=16)
    result["end"] = result["THL"]*4+debut
    # tcp_options
    if (result["THL"] > 5):
        position = 20
        result["Options"] = []
        while position < 20+(result["THL"]-5)*4:
            if stream[position] == 0:
                curr_options_dic: dict = {"type": stream[position], "length": 1}
                result["Options"].append(curr_options_dic)
                position += 1
                break
            if stream[position] == 1 or stream[position] == 11 or stream[position] == 12 or stream[position] == 13:
                curr_options_dic: dict = {"type": stream[position], "length": 1}
                result["Options"].append(curr_options_dic)
                position += 1
                continue
            curr_options_dic: dict = {"type": stream[position], "length": stream[position+1]}
            if position+2 != position+stream[position+1]:
                curr_options_dic["data"] = parse_tcp_options(
                    curr_options_dic["type"], stream[position+2:position+curr_options_dic["length"]])

            else:
                curr_options_dic["data"] = ""
            result["Options"].append(curr_options_dic)
            position += curr_options_dic["length"]
    return result
