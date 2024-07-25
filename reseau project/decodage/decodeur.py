from ethernet import *
from ipv4 import *
from tcp import *
from parse_http import *
from re import *
from datetime import datetime


def read_hex_dump(filename: str):
    return open(filename, mode='r').read()


def pre_process_frame(frame: str) -> str:
    result = sorted(frame.splitlines(), key=lambda line: int(line[:4], base=16))
    if len(result[0]) > 52:
        return "\n".join([line[4:54] for line in result])

    return "\n".join([line[4:] for line in result])


def read_frame(stream: bytes) -> dict:
    print("********* ethernet *********")
    ethernet: dict = parse_ethernet(stream)
    if (ethernet["EtherType"] == "0800"):
        print("********* ipv4 *********")
        ipv4: dict = parse_ipv4(stream[ethernet["end"]:])
        if (ipv4["protocol"] == 6):
            print("********* tcp *********")
            tcp: dict = parse_tcp(stream[ipv4["end"]:], ipv4["end"])
            if (tcp["end"] < len(stream)):
                print("********* http ********")
                http: dict = parse_http(stream[tcp["end"]:])
                return {"ethernet": ethernet, "ipv4": ipv4, "tcp": tcp, "http": http}
            return {"ethernet": ethernet, "ipv4": ipv4, "tcp": tcp}
        return {"ethernet": ethernet, "ipv4": ipv4}
    return {"ethernet": ethernet}


def read_trace(trace: str, offset: bool = True) -> list:
    frames: list = split("\n\n\n", trace)
    print(f"len frame: {len(frames)}")
    if offset:
        frames = [pre_process_frame(f) for f in frames]
    result: list = []
    for f in frames:
        result.append(read_frame(bytes.fromhex(f)))

    return result


def save_frame(frame: dict, output_file):
    if "ipv4" not in frame.keys() and "ethernet" in frame.keys():
        output_file.write(
            f"{frame['ethernet']['Source MAC']}--------->{frame['ethernet']['Destination MAC']}\n")
        output_file.write(print_ethernet(frame["ethernet"]))
        output_file.write("*****ipv4******\n")
        output_file.write("unsupported protocol\n")
    else:
        if "tcp" in frame.keys():
            output_file.write(
                f"{frame['ipv4']['source_IP']}:{frame['tcp']['SPN']}--------->{frame['ipv4']['dest_IP']}:{frame['tcp']['DPN']}\n")
            output_file.write("*****Ethernet******\n")
            output_file.write(print_ethernet(frame["ethernet"]))
            output_file.write("*****ipv4******\n")
            output_file.write(print_IP4(frame["ipv4"]))
            output_file.write("*****tcp******\n")
            output_file.write(print_TCP(frame["tcp"]))
        else:
            output_file.write(f"{frame['ipv4']['source_IP']}--------->{frame['ipv4']['dest_IP']}\n")
            output_file.write("*****Ethernet******\n")
            output_file.write(print_ethernet(frame["ethernet"]))
            output_file.write("*****ipv4******\n")
            output_file.write(print_IP4(frame["ipv4"]))
            output_file.write("*****tcp******\n")
            output_file.write("unsupported protocol\n")
    if "http" in frame.keys():
        output_file.write("*****http******\n")
        output_file.write(print_HTTP(frame["http"]))
    output_file.write("\n")
    return


def generate_text(liste_frames: list, output_path: str = "", filter: str = "") -> str:
    if output_path == "" and filter != "":
        output_path = f"frames-{'_'.join(split('[.: ]',str(datetime.now())))}-{filter}.txt"
    else:
        output_path = f"frames-{'_'.join(split('[.: ]',str(datetime.now())))}.txt"
    output_file = open(output_path, "w")
    if filter[:2] == "ip" and len(filter) > 2:
        ip: list = '.'.split(filter[4:])
        for frame in liste_frames:
            if "ipv4" in frame.keys() and (frame["ipv4"]["source_IP"] == ip or frame["ipv4"]["dest_IP"] == ip):
                save_frame(frame, output_file)

    elif filter == "http":
        for frame in liste_frames:
            if "http" in frame.keys():
                if "tcp" not in frame.keys() and "ethernet" in frame.keys():
                    output_file.write(
                        f"{frame['ethernet']['Source MAC']}--------->{frame['ethernet']['Destination MAC']}\n")
                else:
                    output_file.write(
                        f"{frame['ipv4']['source_IP']}:{frame['tcp']['SPN']}--------->{frame['ipv4']['dest_IP']}:{frame['tcp']['DPN']}\n")
                output_file.write("*****http******\n")
                output_file.write(print_HTTP(frame["http"]))
            output_file.write("\n")

    elif filter == "tcp":
        for frame in liste_frames:
            if "tcp" in frame.keys():
                if "ipv4" not in frame.keys() and "ethernet" in frame.keys():
                    output_file.write(
                        f"{frame['ethernet']['Source MAC']}--------->{frame['ethernet']['Destination MAC']}\n")
                else:
                    output_file.write(
                        f"{frame['ipv4']['source_IP']}:{frame['tcp']['SPN']}--------->{frame['ipv4']['dest_IP']}:{frame['tcp']['DPN']}\n")
                output_file.write("*****tcp******\n")
                output_file.write(print_TCP(frame["tcp"]))
                output_file.write("\n")

    elif filter[0:5] == "ports":
        for frame in liste_frames:
            if "tcp" in frame.keys() and (str(frame["tcp"]["SPN"]) == filter[7:] or str(frame["tcp"]["DPN"])):
                save_frame(frame, output_file)
    else:
        for frame in liste_frames:
            save_frame(frame, output_file=output_file)
    return output_path
