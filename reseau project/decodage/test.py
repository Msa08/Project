from decodeur import *
from graphique import *

test: bytes = bytes.fromhex("08 00 20 0a 70 66 08 00 20 0a ac 96 08 00 4f 00 00 7c 3f 86 00 00 fb 01 49 af c0 21 9f 06 84 e3 3d 05 07 27 28 84 e3 3c 20 c0 2c 41 12 c0 46 47 05 c0 21 9f 02 c0 21 9f 06 c0 46 47 06 c0 2c 41 1a 84 e3 3c 1e 84 e3 3d 87 00 00 00 aa 56 2f 00 00 00 29 36 8c 41 00 03 86 2b 08 09 0a 0b 0c 0d 0e 0f 10 11 12 13 14 15 16 17 18 19 1a 1b 1c 1d 1e 1f 20 21 22 23 24 25 26 27 28 29 2a 2b 2c 2d 2e 2f 30 31 32 33 34 35 36 37")
test_dir: str = "./test/"
test_3: bytes = bytes.fromhex("b4 0c 25 e5 00 10 38 f9 d3 e2 d5 b0 08 00 45 00 01 96 00 00 40 00 40 06 8a c4 0a 33 03 0c c1 33 e0 2b cb 88 00 50 df b6 c7 65 27 1f d0 7b 80 18 08 00 37 aa 00 00 01 01 08 0a 33 3e 8e eb 25 b8 f1 c9 47 45 54 20 2f 4d 46 45 77 54 7a 42 4e 4d 45 73 77 53 54 41 48 42 67 55 72 44 67 4d 43 47 67 51 55 53 4e 72 4a 6f 50 73 72 30 79 31 50 38 4e 35 6f 30 76 56 6e 74 7a 58 35 73 38 51 45 46 42 51 75 73 78 65 33 57 46 62 4c 72 6c 41 4a 51 4f 59 66 72 35 32 4c 46 4d 4c 47 41 68 49 45 6d 38 62 47 73 74 25 32 46 49 59 51 36 63 41 6a 32 57 6a 64 4b 25 32 46 38 4f 49 25 33 44 20 48 54 54 50 2f 31 2e 31 0d 0a 48 6f 73 74 3a 20 72 33 2e 6f 2e 6c 65 6e 63 72 2e 6f 72 67 0d 0a 58 2d 41 70 70 6c 65 2d 52 65 71 75 65 73 74 2d 55 55 49 44 3a 20 32 41 43 46 34 30 31 43 2d 45 38 41 35 2d 34 38 45 33 2d 39 42 37 33 2d 35 37 31 32 31 36 30 45 30 43 30 35 0d 0a 41 63 63 65 70 74 3a 20 2a 2f 2a 0d 0a 55 73 65 72 2d 41 67 65 6e 74 3a 20 63 6f 6d 2e 61 70 70 6c 65 2e 74 72 75 73 74 64 2f 32 2e 32 0d 0a 41 63 63 65 70 74 2d 4c 61 6e 67 75 61 67 65 3a 20 66 72 2d 46 52 2c 66 72 3b 71 3d 30 2e 39 0d 0a 41 63 63 65 70 74 2d 45 6e 63 6f 64 69 6e 67 3a 20 67 7a 69 70 2c 20 64 65 66 6c 61 74 65 0d 0a 43 6f 6e 6e 65 63 74 69 6f 6e 3a 20 6b 65 65 70 2d 61 6c 69 76 65 0d 0a 0d 0a")
test4: bytes = bytes.fromhex(
    "38 f9 d3 e2 d5 b0 b4 0c 25 e5 00 10 08 00 45 00 00 3c 00 00 40 00 38 06 7b e8 c0 7c f9 18 0a 33 03 0c 00 50 cc 3f 3d 8d 58 8c 1e 5c 42 fe a0 12 a9 b0 c6 eb 00 00 02 04 05 b4 04 02 08 0a bb 90 4d 76 d1 2b 72 47 01 03 03 09")
test2_str: str = read_hex_dump(f"{test_dir}temp.txtcap")
# trame fausse (ipv6)
test5: bytes = bytes.fromhex("b4 0c 25 e5 00 10 38 f9 d3 e2 d5 b0 08 01 45 00 01 91 00 00 40 00 40 06 72 93 0a 33 03 0c c0 7c f9 18 cc 3e 00 50 0e d4 a7 56 7b 49 ce cf 80 18 08 0a b9 cf 00 00 01 01 08 0a 32 43 2a dc bb 90 4d 76 47 45 54 20 2f 2f 4d 45 63 77 52 54 42 44 4d 45 45 77 50 7a 41 48 42 67 55 72 44 67 4d 43 47 67 51 55 74 67 67 4e 58 32 78 72 64 75 73 54 35 44 69 6c 25 32 42 47 59 4c 71 46 49 7a 4e 45 34 45 46 45 44 43 76 53 65 4f 7a 44 53 44 4d 4b 49 7a 31 25 32 46 74 73 73 25 32 46 43 30 4c 49 44 4f 41 67 67 72 4f 47 53 45 69 48 63 58 47 41 25 33 44 25 33 44 20 48 54 54 50 2f 31 2e 31 0d 0a 48 6f 73 74 3a 20 6f 63 73 70 2e 67 6f 64 61 64 64 79 2e 63 6f 6d 0d 0a 58 2d 41 70 70 6c 65 2d 52 65 71 75 65 73 74 2d 55 55 49 44 3a 20 34 41 42 36 44 37 45 43 2d 33 34 42 46 2d 34 36 32 33 2d 41 37 38 35 2d 31 46 34 41 38 36 41 37 37 39 31 45 0d 0a 41 63 63 65 70 74 3a 20 2a 2f 2a 0d 0a 55 73 65 72 2d 41 67 65 6e 74 3a 20 63 6f 6d 2e 61 70 70 6c 65 2e 74 72 75 73 74 64 2f 32 2e 32 0d 0a 41 63 63 65 70 74 2d 4c 61 6e 67 75 61 67 65 3a 20 66 72 2d 46 52 2c 66 72 3b 71 3d 30 2e 39 0d 0a 41 63 63 65 70 74 2d 45 6e 63 6f 64 69 6e 67 3a 20 67 7a 69 70 2c 20 64 65 66 6c 61 74 65 0d 0a 43 6f 6e 6e 65 63 74 69 6f 6e 3a 20 6b 65 65 70 2d 61 6c 69 76 65 0d 0a 0d 0a")
test6: bytes = bytes.fromhex("38 f9 d3 e2 d5 b0 b4 0c 25 e5 00 10 08 00 45 00 03 ab 6a da 40 00 3b 06 22 d5 c1 33 e0 2b 0a 33 03 0c 00 50 cb 88 27 1f d0 7b df b6 c8 c7 80 18 01 f5 26 b5 00 00 01 01 08 0a 25 b9 7b dd 33 3e 8e eb 48 54 54 50 2f 31 2e 31 20 32 30 30 20 4f 4b 0d 0a 53 65 72 76 65 72 3a 20 6e 67 69 6e 78 0d 0a 43 6f 6e 74 65 6e 74 2d 54 79 70 65 3a 20 61 70 70 6c 69 63 61 74 69 6f 6e 2f 6f 63 73 70 2d 72 65 73 70 6f 6e 73 65 0d 0a 43 6f 6e 74 65 6e 74 2d 4c 65 6e 67 74 68 3a 20 35 30 33 0d 0a 45 54 61 67 3a 20 22 34 41 34 41 43 30 30 31 46 34 35 36 42 46 31 32 31 32 43 39 44 36 31 34 36 32 43 42 43 34 33 43 31 38 44 38 30 43 42 46 36 38 43 37 46 31 33 39 33 39 35 35 45 31 44 41 31 45 38 35 36 45 46 43 22 0d 0a 4c 61 73 74 2d 4d 6f 64 69 66 69 65 64 3a 20 4d 6f 6e 2c 20 32 31 20 4e 6f 76 20 32 30 32 32 20 32 33 3a 30 30 3a 30 30 20 55 54 43 0d 0a 43 61 63 68 65 2d 43 6f 6e 74 72 6f 6c 3a 20 70 75 62 6c 69 63 2c 20 6e 6f 2d 74 72 61 6e 73 66 6f 72 6d 2c 20 6d 75 73 74 2d 72 65 76 61 6c 69 64 61 74 65 2c 20 6d 61 78 2d 61 67 65 3d 35 35 33 0d 0a 45 78 70 69 72 65 73 3a 20 54 68 75 2c 20 32 34 20 4e 6f 76 20 32 30 32 32 20 31 35 3a 35 31 3a 30 35 20 47 4d 54 0d 0a 44 61 74 65 3a 20 54 68 75 2c 20 32 34 20 4e 6f 76 20 32 30 32 32 20 31 35 3a 34 31 3a 35 32 20 47 4d 54 0d 0a 43 6f 6e 6e 65 63 74 69 6f 6e 3a 20 6b 65 65 70 2d 61 6c 69 76 65 0d 0a 0d 0a 30 82 01 f3 0a 01 00 a0 82 01 ec 30 82 01 e8 06 09 2b 06 01 05 05 07 30 01 01 04 82 01 d9 30 82 01 d5 30 81 be a1 34 30 32 31 0b 30 09 06 03 55 04 06 13 02 55 53 31 16 30 14 06 03 55 04 0a 13 0d 4c 65 74 27 73 20 45 6e 63 72 79 70 74 31 0b 30 09 06 03 55 04 03 13 02 52 33 18 0f 32 30 32 32 31 31 32 31 32 33 31 30 30 30 5a 30 75 30 73 30 4b 30 09 06 05 2b 0e 03 02 1a 05 00 04 14 48 da c9 a0 fb 2b d3 2d 4f f0 de 68 d2 f5 67 b7 35 f9 b3 c4 04 14 14 2e b3 17 b7 58 56 cb ae 50 09 40 e6 1f af 9d 8b 14 c2 c6 02 12 04 9b c6 c6 b2 df c8 61 0e 9c 02 3d 96 8d d2 bf f0 e2 80 00 18 0f 32 30 32 32 31 31 32 31 32 33 30 30 30 30 5a a0 11 18 0f 32 30 32 32 31 31 32 38 32 32 35 39 35 38 5a 30 0d 06 09 2a 86 48 86 f7 0d 01 01 0b 05 00 03 82 01 01 00 99 ee d5 80 e2 e2 27 cf 43 3e 56 d2 c9 aa 14 e0 21 a7 1e a9 1a 33 6f c8 c5 99 68 d4 a7 a0 ff 48 af 08 ae 91 18 0d 28 89 23 c3 5b e2 d2 aa ef 1f 6f 83 0b 41 fe bb 3a 08 84 59 57 30 b2 7a 40 4a 76 70 de 3e b5 d4 5a ec 9d cb 0d 3b 11 a6 a6 50 06 93 85 5b d0 3e a2 e7 ad f7 33 68 aa 7f 21 4d c4 bc de c4 3f b2 d8 5c fa 1a 0e b5 89 fb 69 86 a8 8b 5c 30 d7 6f 31 dd 43 75 ac 4a 57 28 06 0b 98 5f 46 20 8f 40 84 cc 2c 3f cc ff 05 cf d9 8c b3 1f 99 39 78 c1 e0 e8 78 ce 21 20 a3 99 5d 50 b9 b3 93 c8 2a f3 d6 a9 28 a4 09 1b 35 cc 39 ee a1 68 38 30 98 56 9a e4 c0 2d 32 73 8e 9c 94 27 91 d9 fa 67 2b 49 e3 94 b1 c9 d9 2d 35 43 4d 20 bc 02 51 70 2d 4d a4 15 ec 75 75 ad 9a 65 78 dd 16 72 c7 81 e5 6c fd 2f 0c a6 7e 95 d1 9e f6 17 23 fe ce 18 8a 46 d5 8c 91 06 5d 0b 38 50 06 67")
test1: bytes = bytes.fromhex("b4 0c 25 e5 00 10 38 f9 d3 e2 d5 b0 08 00 45 00 00 cd 00 00 40 00 40 06 d9 1e 0a 33 1f 0b 11 fd 25 d2 ed 3a 00 50 4f b9 63 21 4a 66 f6 19 80 18 00 2e cd d1 00 00 01 01 08 0a 1d cc 47 ac e2 61 c5 85 43 4f 4e 4e 45 43 54 20 70 72 6f 78 79 2d 73 61 66 65 62 72 6f 77 73 69 6e 67 2e 67 6f 6f 67 6c 65 61 70 69 73 2e 63 6f 6d 3a 34 34 33 20 48 54 54 50 2f 31 2e 31 0d 0a 48 6f 73 74 3a 20 70 72 6f 78 79 2d 73 61 66 65 62 72 6f 77 73 69 6e 67 2e 67 6f 6f 67 6c 65 61 70 69 73 2e 63 6f 6d 0d 0a 50 72 6f 78 79 2d 43 6f 6e 6e 65 63 74 69 6f 6e 3a 20 6b 65 65 70 2d 61 6c 69 76 65 0d 0a 43 6f 6e 6e 65 63 74 69 6f 6e 3a 20 6b 65 65 70 2d 61 6c 69 76 65 0d 0a 0d 0a")
# trame qui utilise autre chose que du tcp pour tester le crash
test_7: bytes = bytes.fromhex(
    "38 f9 d3 e2 d5 b0 b4 0c 25 e5 00 10 08 00 45 00 00 34 b9 b9 00 00 39 05 0e 65 98 c7 13 a0 0a 33 03 0c")
# print(pre_process_frame(test2_str))
ascii_str = open(f"{test_dir}ascii_dump.txt").read()
test2 = bytes.fromhex(pre_process_frame(test2_str))
# test_http = bytes.fromhex(pre_process_frame(read_hex_dump(f"{test_dir}http.txt")))
#print(test_ascii := pre_process_frame(ascii_str))
#test_ascii = bytes.fromhex(test_ascii)
#test_list: list = [test4, test5, test6, test1, test_7, test_ascii]

read_trace(ascii_str, offset=True)


def gen_trace():
    with open(f"{test_dir}example2.txt", "w") as f:
        for t in test_list:
            for i in range(0, len(t), 16):
                if i+16 <= len(t):
                    print(f"{bytes.hex(t[i:i+16], sep=' ')}", file=f)
                else:
                    if test_list.index(t) < len(test_list)-1:
                        print(f"{bytes.hex(t[i:], sep=' ')}\n\n", file=f)
                    else:
                        print(f"{bytes.hex(t[i:], sep=' ')}", file=f)

    return


# gen_trace()

#print("test ascii")
# read_frame(test_ascii)


# for t in test_list:

#    test_frame(t)

#liste_trame_analyse = read_trace(read_hex_dump(f"{test_dir}ascii_dump.txt"), offset=True)
#graphique = graph()
# graphique.initialisation_fenetre()
# graphique.affichage_trame(liste_trame_analyse)
# graphique.lancement()
# generate_text(liste_trame_analyse)

# parse_ethernet(test)
# parse_ipv4(test[14:])
# parse_ipv4(test2[14:])
# print(test[14:])
# parse_ethernet(test4)
# parse_ipv4(test4[14:])
# parse_ethernet(test_http)
# parse_tcp(test5[34:], 34)
# parse_http(test5[66:])
