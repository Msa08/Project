import requests
from bs4 import BeautifulSoup

ethernet_link: str = "https://www.iana.org/assignments/ieee-802-numbers/ieee-802-numbers.xhtml"
ipv4_link: str = "https://www.iana.org/assignments/ip-parameters/ip-parameters.xhtml"
tcp_link: str = "https://www.iana.org/assignments/tcp-parameters/tcp-parameters.xhtml"
ip_protocol_link: str = "https://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml"


def get_data(link: str, ext: str = "csv"):
    response = requests.get(link)
    links = (BeautifulSoup(response.content, 'html5lib')).findAll('a')
    page_start: str = "/".join(link.split("/")[:-1])
    csv_links: list = [f"{page_start}/{l['href']}"
                       for l in links if "href" in (l.attrs).keys() and l["href"].endswith(ext)]

    return csv_links


def download_data(links: list, dir="./csv/"):
    filenames: list = []
    for link in links:
        filename: str = f"{dir}auto-{link.split('/')[-1]}"
        print(f"Downloading file: {filename}")
        response = requests.get(link, stream=True)
        with open(filename, 'wb') as f:
            for chunk in response.iter_content(chunk_size=1024*1024):
                f.write(chunk)
        filenames.append(filename)
    print("Download successful!")
    return filenames
