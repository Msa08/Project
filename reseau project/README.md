# ReseauProject

Ce projet est un visualisateur de traffic réseau pour le cours LU3IN033 à l'UPMC. Les protocoles supportés sont: 

- Couche 2: Ethernet
- Couche 3: IPv4
- Couche 4: TCP
- Couche 7: HTTP


## decodage

### ethernet.py 

```python
parse_ethernet(stream: bytes) -> dict;
# permet d'analyser une trame ethernet. 
# Retourne un dictionnaire avec les informations suivantes comme clés:
    {
    "Destination MAC":<value>, 
    "Source MAC":<value>, 
    "EtherType":<value>, 
    "end":<value>
     }
# la value de "end" correspond à l'indice de la fin 
# de l'entête Ethernet dans la trame lue.

print_ethernet(eth_dic: dict, silent: bool = True)->str;
# prend en entrée un dictionnaire ethernet (tel que généré par parse_ethernet()) et retourne sa représentation sous forme d'une chaine de caractères formatée. L'option `silent` permet de supprimer l'affichage de ladite chaine de caractère sur le stdout.
```

### ipv4.py

```python
parse_IP_adress(stream: bytes)->list;
# prend en entrée un flux d'octets représentant une adresse IP et retourne une liste des quatre nombres la composant en décimal.
parse_IP_options(type: int, stream: bytes);
# prends en entrée un entier correspondant au nombre 
# de l'option IP ainsi que la portion du flux d'octet 
# la représentant; n'analyse en détails que l'option 7
# (Record Route) pour le moment.
parse_ipv4(stream: bytes, start: int = 14);
# prends en entrée un flux d'octets représentant une trame IP
# et retourne un dictionnaire avec les informations suivantes:
{
    "version":<value>, # version du protocole IP
    "hlen": <value>, # header length
    "DSCP": <value>, # Differentiated Services Field Codepoint
    "ECN": <value>, # Explicit Congestion Notification
    "total length": <value>, # total length of the packet in bytes, including header and data
    "id": <value>, 
    "flags": <value>, # Raises an Exception if the reserved flag is not set to 0
    "fragment_offset": <value>, # offset of the fragment relative to the original IP datagram if it was fragmented
    "TTL": <value>, # Time To Live
    "protocol": <value>, # protocol used in the data portion of the datagramtc
    "header_checksum":<value>, 
    "source_IP":<value>,
    "dest_IP":<value>,
    "options":<value>,
    "end":<value>,
    }


}

print_IP4(ip_dic: dict, silent: bool = True)->str;
# prend en entrée un dictionnaire ipv4 (tel que généré par parse_ipv4()) et retourne sa représentation sous forme d'une chaine de caractères formatée. L'option `silent` permet de supprimer l'affichage de ladite chaine de caractère sur le stdout.

```

### tcp.py

```python
parse_tcp_options(type: int, stream: bytes);
# prends en entrée un entier correspondant au nombre 
# de l'option TCP ainsi que la portion du flux d'octet 
# la représentant; la valeur de retour dépend donc de l'option.
parse_tcp(stream: bytes, debut: int) -> dict;
# prends en entrée un flux d'octets représentant une trame tcp
# et retourne un dictionnaire avec les informations suivantes:
{
    "SPN":<value>, # Source Port Number
    "DPN": <value>, # Destination Port Number
    "Sequence number": <value>, # (in absolute value)
    "Acknowledgment number": <value>, # (in absolute value) 
    "THL": <value>, # total header length
    "URG": <value>, #urgent pointer 
    "ACK": <value>, #Acknowledgment
    "PSH": <value>, #push 
    "RST": <value>, #reset
    "SYN": <value>, 
    "FIN": <value>, #finish
    "Window": <value>, #how many bytes the receiver is willing to receive
    "Checksum": <value>, 
    "Urgent": <value>, #if the urgent pointer is set, where the urgent data ends
    "end": <value>,
    "Options": <value>,
    }


print_TCP(tcp_dic: dict, silent: bool = True) -> str;
# prend en entrée un dictionnaire tcp (tel que généré par parse_tcp()) et retourne sa représentation sous forme d'une chaine de caractères formatée. L'option `silent` permet de supprimer l'affichage de ladite chaine de caractère sur le stdout.
```

### parse_http.py

Le fichier est nommé `parse_http.py`au lieu de `http.py` car `http.py`entrait en conflit avec l'une des dépendances de `scraping.py`.
```python
parse_http(stream: bytes) -> Union[dict, None];
# prends en entrée un flux d'octets représentant une trame tcp
# et retourne un dictionnaire avec les informations suivantes:
{
    "Type": <value>,
    "reponse version":<value>,
    "Status code":<value>,
    "Response phrase": <value>,
}
ou 
{
    "Type": <value>,
    "URI":<value>,
    "Version":<value>,
}

print_HTTP(http_dic: dict, silent: bool = True) -> str;
print_HTTP(http_dic: dict, silent: bool = True) -> str;
# selon le type de header http.
```

### utils.py

```python

# collection de fonctions qui, à partir de la documentation offficielle de l'IANA, automatiquement génèrent un dictionnaire d'options, protocoles... utilisé pour l'interprétation des nombres décodés dans les champs correspondant par les fonctions de parsing.
generate_ethertypes(ethertype_path: str = f"{csv_dir}ieee-802-numbers-ethertypes.csv", dest_path: str = "") -> dict;
generate_ip_options(ip_options_path: str = f"{csv_dir}ip-parameters-1.csv", dest_path: str = "") -> dict;
def generate_ip_protocols(ip_protocols_path: str = f"{csv_dir}protocol-numbers-1.csv", dest_path: str = "") -> dict;
generate_tcp_options(tcp_options_path: str = f"{csv_dir}tcp-parameters-1.csv", dest_path: str = "") -> dict;

```

### scraping.py

```python
# fonctions de web scraping qui vont sur les pages web du site de l'IANA documentant les différentes valeurs possibles pour les champs d'options de chaque protocole, et télécharge localement les fichiers csv fournis dans le répertoire csv/. Ces fichiers sont ensuite utilisés pour les fonctions d'utils.py.
get_data(link: str, ext: str = "csv")->list;
download_data(links: list, dir="./csv/")->list;
```

### graphique.py 

```python
# fichier contenant tout ce qui rapporte à l'interface graphique (instance de la classe graph définie ci-dessous).
class graph:
    __init__(self);
    scroll(self); #implémentation du scrolling sur les divers widgets de l'interface graphique.
    reset_filtre(self); #réinitialise l'interface après avoir appliqué un filtre.
    recupere_filtre(self); #applique le filtre requis par l'utilisateur sur l'interface.
    save_filters(self); #sauvegarde les données appropriées selon le filtre appliqué par l'utilisateur; en l'absence de filtre, sauvegarde toutes les informations générées.
    open_file(self); #gestion de la fonction d'explorateur de fichiers pour ouvrir une trace à analyser depuis l'interface graphique.
    delete(self); #remise à zéro de l'interface graphique si l'utilisateur ouvre une nouvelle trace.
    initialisation_fenetre(self); #initialisation de l'interface graphique.
    affichage_trame(self, liste_analyse: list); #visualisation de la trace après analyse.
    lancement(self); #lancement de l'interface.
```


### test.py

fichier contenant les essais effectués au fil du développement pour tester son fonctionnement.

### decodeur.py

Fonctions de lecture, analyse, et écritures de traces écrites (fichier txt).

```python
read_hex_dump(filename: str);
pre_process_frame(frame: str) -> str;
read_frame(stream: bytes) -> dict;
read_trace(trace: str, offset: bool = True) -> list;
generate_text(liste_frames: list, output_path: str = f"frames-{'_'.join(split('[.: ]',str(datetime.now())))}.txt") -> str
main();
```

## csv 

fichiers csv contenant la documentation des options correspondantes aux protocoles supportés et utilisée lors de l'analyse des trames. Les fichiers précédés de "auto" sont ceux auto-générés par les fonctions de scraping.py. Les fichiers sans préfixes sont des copies locales des données récupérées sur le site de l'IANA au cas-où le téléchargement échoue.

## test

trames tests utilisées en cours de développement pour tester le décodeur. Le contenu du répertoire n'est donc pas constant.