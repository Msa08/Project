from graphique import *
from os.path import exists
from sys import argv


def main():
    graphique = graph()
    graphique.initialisation_fenetre()
    if len(argv) == 2:
        if not exists(argv[1]):
            print("invalid path.")
            return
        trace: str = open(argv[1]).read()
        offset: bool = match("[0-9a-fA-F]{4}\s", trace[:5])
        print(f"Offset:{offset}")
        frame_list: list = read_trace(trace, offset=offset)
        graphique.affichage_trame(frame_list)
    graphique.lancement()
    graphique.fenetre.attributes("-fullscreen", True)
    return


main()
