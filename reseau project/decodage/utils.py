import csv
from scraping import *
csv_dir: str = "./csv/"
download_etherfiles: bool = True
download_ipfiles: bool = True
download_tcpfiles: bool = True
download_ip_protocols: bool = True
ether_path: str = ""
ip_path: str = ""
tcp_path: str = ""
protocol_path: str = ""


def generate_ethertypes(ethertype_path: str = f"{csv_dir}ieee-802-numbers-ethertypes.csv", dest_path: str = "") -> dict:
    exception: bool = False
    global download_etherfiles
    global ether_path
    try:
        if (download_etherfiles):
            ether_files: list = download_data(get_data(ethernet_link))
            download_etherfiles = False
            auto_table: str = (open(file=ether_files[0], mode="r")).read()
            if (auto_table.startswith("Ethertype")):
                ether_path = ether_files[0]

    except Exception as e:
        print(e)
        exception = True
    finally:
        if exception:
            print("Warning: ethertype data could not be updated; fallback mode.")
        reader = csv.reader(open(file=ether_path, mode="r"))
        ethertypes: dict = {row[1]: row[4] for row in reader}
        if dest_path != "":
            with open(file=dest_path, mode="w") as f:
                print(str(ethertypes), f)
    return ethertypes


def generate_ip_options(ip_options_path: str = f"{csv_dir}ip-parameters-1.csv", dest_path: str = "") -> dict:
    exception: bool = False
    global download_ipfiles
    global ip_path
    try:
        if (download_ipfiles):
            ip4_option_files: list = download_data(get_data(ipv4_link))
            download_ipfiles = False
            auto_table: str = (open(file=ip4_option_files[0], mode="r")).read()
            if (auto_table.startswith("Copy")):
                ip_path = ip4_option_files[0]
    except Exception as e:
        print(e)
        exception = True
    finally:
        if exception:
            print("Warning: ipv4 option data could not be updated; fallback mode.")
        reader = csv.reader(open(file=ip_path, mode="r"))
        ip_options: dict = {row[2]: row[4] for row in reader}
        if dest_path != "":
            with open(file=dest_path, mode="w") as f:
                print(str(ip_options), f)

    return ip_options


def generate_ip_protocols(ip_protocols_path: str = f"{csv_dir}protocol-numbers-1.csv", dest_path: str = "") -> dict:
    exception: bool = False
    global download_ip_protocols
    global protocol_path
    try:
        if (download_ip_protocols):
            ip_protocol_files: list = download_data(get_data(ip_protocol_link))
            download_ip_protocols = False
            auto_table: str = (open(file=ip_protocol_files[0], mode="r")).read()
            if (auto_table.startswith("Decimal")):
                protocol_path = ip_protocol_files[0]
    except Exception as e:
        print(e)
        exception = True
    finally:
        if exception:
            print("Warning: ipv4 option data could not be updated; fallback mode.")
        reader = csv.reader(open(file=protocol_path, mode="r"))
        ip_options: dict = {row[0]: row[2] for row in reader}
        if dest_path != "":
            with open(file=dest_path, mode="w") as f:
                print(str(ip_options), f)

    return ip_options


def generate_tcp_options(tcp_options_path: str = f"{csv_dir}tcp-parameters-1.csv", dest_path: str = "") -> dict:
    exception: bool = False
    global download_tcpfiles
    global tcp_path
    try:
        if (download_tcpfiles):
            tcp_options_files: list = download_data(get_data(tcp_link))
            download_tcpfiles = False
            auto_table: str = (open(file=tcp_options_files[0], mode="r")).read()
            if (auto_table.startswith("Kind")):
                tcp_path = tcp_options_files[0]
    except Exception as e:
        print(e)
        exception = True
    finally:
        if exception:
            print("Warning: tcp option data could not be updated; fallback mode.")
        reader = csv.reader(open(file=tcp_path, mode="r"))
        tcp_options: dict = {}
        for row in reader:
            tcp_options[row[0]] = row[2]
        if dest_path != "":
            with open(file=dest_path, mode="w") as f:
                print(str(tcp_options), f)

    return tcp_options


# print(generate_ethertypes()["FFFF"])
# print(generate_ip_options()["7"])
# print(generate_tcp_options())
# print(generate_ip_protocols()["0"])
