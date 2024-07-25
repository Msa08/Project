from tkinter import *
from tkinter import messagebox
from tkinter import ttk
from tkinter import filedialog
from decodeur import *


class graph:
    def __init__(self):
        self.fenetre: Tk
        self.canvas: Canvas
        self.commentaire: Canvas
        self.add_ip: Canvas
        self.filtre: Entry
        self.frame: Frame
        self.ip: Frame
        self.tab_trame: list = []
        self.tab_ports: list = []
        self.ligne: list = []
        self.flags: list = []
        self.compteur_trame = 0
        self.liste_commentaire: list = []
        self.liste_ip: dict = {}
        self.ordre_ip: list = []
        self.filemenu: Menu
        self.file: str = None
        self.liste_analyse: list
        self.nb_trame : int = 0

    def scroll(self):
        self.add_ip.update()
        self.add_ip.pack()

        def scroll_y(nb_units: int):
            self.canvas.yview_scroll(nb_units, "units")
            self.commentaire.yview_scroll(nb_units, "units")
            return

        def scroll_x(nb_units):
            self.canvas.xview_scroll(nb_units, "units")
            self.add_ip.xview_scroll(nb_units, "units")
            return

        vertibar = Scrollbar(self.canvas, orient=VERTICAL, command=self.canvas.yview)
        horibar = Scrollbar(self.canvas, orient=HORIZONTAL, command=self.canvas.xview)
        vertibar2 = Scrollbar(self.commentaire, orient=VERTICAL, command=self.commentaire.yview)
        horibar2 = Scrollbar(self.commentaire, orient=HORIZONTAL, command=self.commentaire.xview)
        # binding to appropriate widgets
        max_height: float = self.canvas.coords(self.tab_trame[self.compteur_trame-1])[3]
        max_width: float = self.canvas.coords(self.tab_trame[self.compteur_trame-1])[2]
        min_width: float = self.canvas.coords(self.tab_trame[self.compteur_trame-1])[0]
        self.commentaire.config(yscrollcommand=vertibar2.set, xscrollcommand=horibar2.set,
                                scrollregion=(0, 0, 1, max_height))
        self.canvas.config(yscrollcommand=vertibar.set, xscrollcommand=horibar.set,
                           scrollregion=(0, 1, max_width, max_height))
        self.add_ip.config(xscrollcommand=horibar.set, scrollregion=(
            min_width, self.add_ip.bbox("all")[1], max_width*1.57, self.add_ip.bbox("all")[3]))
        self.commentaire.focus_set()
        self.add_ip.focus_set()
        self.canvas.pack(expand=True, side=LEFT, fill=BOTH)
        self.commentaire.pack(expand=True, side=RIGHT, fill=BOTH)
        self.add_ip.pack(expand=True, side=TOP, fill=BOTH)

        self.canvas.bind("<Left>", lambda event: scroll_x(-1))
        self.canvas.bind("<Right>", lambda event: scroll_x(1))
        self.canvas.bind("<Up>", lambda event: scroll_y(-1))
        self.canvas.bind("<Down>", lambda event: scroll_y(1))

        self.canvas.focus_set()

        return

    def reset_filtre(self):
        self.canvas.itemconfig('all', state='normal')
        self.commentaire.itemconfig('all', state='normal')

    def recupere_filtre(self):
        self.nb_trame=self.compteur_trame
        filtre = self.filtre.get()
        self.scroll()
        if filtre == "tcp":
            for rect in self.tab_trame:
                if self.canvas.itemcget(rect, "fill") != "sky blue" and self.canvas.itemcget(rect, "fill") != "light green":
                    self.canvas.itemconfig(rect, state='hidden')
                    self.nb_trame-=1
                    for source, dest in self.tab_ports:
                        if source < 0:
                            continue
                        if (int(self.canvas.coords(rect)[1]) < int(self.canvas.coords(source)[1]) and int(self.canvas.coords(rect)[3]) > int(self.canvas.coords(source)[1]
                                                                                                                                             )) or (int(self.canvas.coords(rect)[1]) < int(self.canvas.coords(dest)[1]) and int(self.canvas.coords(rect)[3]) > int(self.canvas.coords(dest)[1])):
                            self.canvas.itemconfig(source, state='hidden')
                            self.canvas.itemconfig(dest, state='hidden')
                    for fleche in self.ligne:
                        # print(self.canvas.coords(rect)[1], self.canvas.coords(fleche)[1],self.canvas.coords(rect)[3])
                        if (int(self.canvas.coords(rect)[1]) < int(self.canvas.coords(fleche)[1]) and int(self.canvas.coords(rect)[3]) > int(self.canvas.coords(fleche)[1])):
                            self.canvas.itemconfig(fleche, state='hidden')

                    for flag in self.flags:
                        if (int(self.canvas.coords(rect)[1]) < int(self.canvas.coords(flag)[1]) and int(self.canvas.coords(rect)[3]) > int(self.canvas.coords(flag)[1])):
                            self.canvas.itemconfig(flag, state='hidden')

                    for com in self.liste_commentaire:
                        if (int(self.canvas.coords(rect)[1]) <= int(self.commentaire.coords(com)[1]) and int(self.canvas.coords(rect)[3]) >= int(self.commentaire.coords(com)[1])):
                            self.commentaire.itemconfig(com, state='hidden')

        if filtre == "http":
            for rect in self.tab_trame:
                if self.canvas.itemcget(rect, "fill") != "light green":
                    self.canvas.itemconfig(rect, state='hidden')
                    self.nb_trame-=1
                    for source, dest in self.tab_ports:
                        if source < 0:
                            continue
                        if (int(self.canvas.coords(rect)[1]) < int(self.canvas.coords(source)[1]) and int(self.canvas.coords(rect)[3]) > int(self.canvas.coords(source)[1]
                                                                                                                                             )) or (int(self.canvas.coords(rect)[1]) < int(self.canvas.coords(dest)[1]) and int(self.canvas.coords(rect)[3]) > int(self.canvas.coords(dest)[1])):
                            self.canvas.itemconfig(source, state='hidden')
                            self.canvas.itemconfig(dest, state='hidden')
                    for fleche in self.ligne:
                        if (int(self.canvas.coords(rect)[1]) < int(self.canvas.coords(fleche)[1]) and int(self.canvas.coords(rect)[3]) > int(self.canvas.coords(fleche)[1])):
                            self.canvas.itemconfig(fleche, state='hidden')
                    for flag in self.flags:
                        if (int(self.canvas.coords(rect)[1]) < int(self.canvas.coords(flag)[1]) and int(self.canvas.coords(rect)[3]) > int(self.canvas.coords(flag)[1])):
                            self.canvas.itemconfig(flag, state='hidden')
                    for com in self.liste_commentaire:
                        if (int(self.canvas.coords(rect)[1]) < int(self.commentaire.coords(com)[1]) and int(self.canvas.coords(rect)[3]) > int(self.commentaire.coords(com)[1])):
                            self.commentaire.itemconfig(com, state='hidden')
        if filtre == "":
            self.canvas.itemconfig('all', state='normal')
            self.commentaire.itemconfig('all', state='normal')
            self.nb_trame=self.compteur_trame
        if filtre[0:5] == "ports":
            for rect in self.tab_trame:
                if self.canvas.itemcget(rect, "fill") == "orange" or self.canvas.itemcget(rect, "fill") == "red":
                    self.canvas.itemconfig(rect, state='hidden')
                    self.nb_trame-=1
                    for com in self.liste_commentaire:
                        if (int(self.canvas.coords(rect)[1]) < int(self.commentaire.coords(com)[1]) and int(self.canvas.coords(rect)[3]) > int(self.commentaire.coords(com)[1])):
                            self.commentaire.itemconfig(com, state='hidden')
                    for fleche in self.ligne:
                        if (int(self.canvas.coords(rect)[1]) < int(self.canvas.coords(fleche)[1]) and int(self.canvas.coords(rect)[3]) > int(self.canvas.coords(fleche)[1])):
                            self.canvas.itemconfig(fleche, state='hidden')
            for ports in self.tab_ports:
                source, dest = ports
                if filtre != "ports=="+self.canvas.itemcget(source, "text") and filtre != "ports=="+self.canvas.itemcget(dest, "text"):
                    for rect in self.tab_trame:
                        if (int(self.canvas.coords(rect)[1]) < int(self.canvas.coords(source)[1]) and int(self.canvas.coords(rect)[3]) > int(self.canvas.coords(source)[1])
                            ) or (int(self.canvas.coords(rect)[1]) < int(self.canvas.coords(dest)[1]) and int(self.canvas.coords(rect)[3]) > int(self.canvas.coords(dest)[1])
                                  ):
                            self.canvas.itemconfig(rect, state='hidden')
                            self.canvas.itemconfig(source, state='hidden')
                            self.canvas.itemconfig(dest, state='hidden')
                            self.nb_trame-=1
                            for fleche in self.ligne:
                                if (int(self.canvas.coords(rect)[1]) < int(self.canvas.coords(fleche)[1]) and int(self.canvas.coords(rect)[3]) > int(self.canvas.coords(fleche)[1])):
                                    self.canvas.itemconfig(fleche, state='hidden')
                            for flag in self.flags:
                                if (int(self.canvas.coords(rect)[1]) < int(self.canvas.coords(flag)[1]) and int(self.canvas.coords(rect)[3]) > int(self.canvas.coords(flag)[1])):
                                    self.canvas.itemconfig(flag, state='hidden')
                            for com in self.liste_commentaire:
                                if (int(self.canvas.coords(rect)[1]) < int(self.commentaire.coords(com)[1]) and int(self.canvas.coords(rect)[3]) > int(self.commentaire.coords(com)[1])):
                                    self.commentaire.itemconfig(com, state='hidden')
            if self.nb_trame==0:
                messagebox.showerror("Error", "Port inconnu")
        if filtre[0:2] == "ip":
            cpt = 0
            ip = filtre[4:]
            liste_rect: list = []
            if (ip not in self.liste_ip.keys()):
                self.canvas.itemconfig('all', state='hidden')
                self.commentaire.itemconfig('all', state='hidden')
                self.nb_trame=0
                messagebox.showerror("Error", "IP inconnu")
            else:
                nb=0
                for fleche in self.ligne:
                    if not ((int(self.liste_ip[ip]) - 2*self.fenetre.winfo_width()/18 < int(self.canvas.coords(fleche)[0]) and int(self.liste_ip[ip])+2*self.fenetre.winfo_width()/18 > int(self.canvas.coords(fleche)[0])
                             ) or (int(self.liste_ip[ip]) - 2*self.fenetre.winfo_width()/18 < int(self.canvas.coords(fleche)[2]) and int(self.liste_ip[ip])+2*self.fenetre.winfo_width()/18 > int(self.canvas.coords(fleche)[2]))):
                        self.canvas.itemconfig(fleche, state='hidden')
                        for rect in self.tab_trame:
                            if (int(self.canvas.coords(rect)[1]) < int(self.canvas.coords(fleche)[1]) and int(self.canvas.coords(rect)[3]) > int(self.canvas.coords(fleche)[1])):
                                self.canvas.itemconfig(rect, state='hidden')
                                self.nb_trame-=1
                            elif self.canvas.itemcget(rect, "fill") == "orange" and self.canvas.itemcget(rect, "state")!="hidden":
                                self.canvas.itemconfig(rect, state='hidden')
                                self.nb_trame-=1
                        for com in self.liste_commentaire:
                            if (int(self.canvas.coords(fleche)[1]) == int(self.commentaire.coords(com)[1]+15)):
                                self.commentaire.itemconfig(com, state='hidden')
                            elif self.commentaire.itemcget(com, "text")[0:3] == "Eth":
                                self.commentaire.itemconfig(com, state='hidden')
                for flag in self.flags:
                    if not ((int(self.liste_ip[ip]) - 2*self.fenetre.winfo_width()/18 < int(self.canvas.coords(flag)[0]) and int(self.liste_ip[ip])+2*self.fenetre.winfo_width()/18 > int(self.canvas.coords(flag)[0]))):
                        self.canvas.itemconfig(flag, state='hidden')

                for source, dest in self.tab_ports:
                    if (self.liste_ip[ip] != int(self.canvas.coords(source)[0])-2) and (self.liste_ip[ip] != int(self.canvas.coords(dest)[0])-2):
                        self.canvas.itemconfig(source, state='hidden')
                        self.canvas.itemconfig(dest, state='hidden')

        messagebox.showinfo("Nombre de trame", "Nombre de trame affiché : "+str(self.nb_trame))

    def save_filters(self):
        output_path: str = generate_text(liste_frames=self.liste_analyse, filter=self.filtre.get())
        print(f"the output was saved at: {output_path}")
        return

    def open_file(self):
        filename = filedialog.askopenfilename(initialdir="/",
                                              title="Select a File",
                                              filetypes=(("Text files",
                                                          "*.txt*"),
                                                         ("all files",
                                                          "*.*")))
        offset: bool = False
        # Change label contents
        self.file = open(filename).read()
        offset: bool = False
        if match("[a-fA-F0-9]{4}\s", self.file):
            offset = True
        print(f"Offset:{offset}")
        frame_list: list = read_trace(self.file, offset=offset)
        self.fenetre.attributes("-fullscreen", True)
        self.delete()
        self.affichage_trame(frame_list)

    def delete(self):
        self.canvas.delete('all')
        self.commentaire.delete('all')
        self.add_ip.delete('all')
        self.tab_trame = []
        self.tab_ports = []
        self.ligne = []
        self.flags = []
        self.compteur_trame = 0
        self.liste_commentaire = []
        self.liste_ip = {}
        self.ordre_ip = []
        
    def exit(self):
        rep=messagebox.askquestion("Quitter ?", "Voulez vous vraiment quitter ?")
        if(rep=="yes"):
            self.fenetre.quit()

    def initialisation_fenetre(self):
        self.fenetre = Tk()
        self.fenetre.title("Visualisateur")
        fenetre = self.fenetre
        self.fenetre.attributes("-fullscreen", True)

        # créer un menu
        menubar = Menu(fenetre)
        # créer un sous-menu
        filemenu = Menu(menubar, tearoff=0)
        filemenu.add_command(label="Open", command=self.open_file)
        filemenu.add_command(label="Quit", command=self.exit)
        editmenu = Menu(menubar, tearoff=0)
        editmenu.add_command(label="Reset Filters", command=self.reset_filtre)
        menubar.add_cascade(label="File", menu=filemenu)
        menubar.add_cascade(label="Edit", menu=editmenu)
        self.label_file_explorer = Label(fenetre,
                                         text="File Explorer using Tkinter",
                                         width=100, height=4,
                                         fg="blue")

        # afficher le menu
        self.filemenu = filemenu
        fenetre.config(menu=menubar)
        # filtre
        self.filtre = ttk.Entry(self.fenetre, width=40, background='white', font=('black'))
        self.filtre.pack()
        bouton = Button(fenetre, text="Valider", command=self.recupere_filtre)
        bouton.pack()
        bouton_reset = Button(fenetre, text="Reinitialiser les filtres", command=self.reset_filtre)
        bouton_reset.pack()
        #Frame Ip and Comment
        Frame1 = Frame(self.fenetre, height=15*self.fenetre.winfo_height(),
                       width=self.fenetre.winfo_width()/3, background='white')
        Frame2 = Frame(self.fenetre, height=self.fenetre.winfo_height()/20,
                       width=self.fenetre.winfo_width(), background='white')
        Frame2.pack(side=TOP)
        Frame1.pack(side=RIGHT)
        self.ip = Frame2
        self.frame = Frame1
        #Create Canvas for ip, comment and 
        self.canvas = Canvas(self.fenetre, width=15*self.fenetre.winfo_width(),
                             height=15*self.fenetre.winfo_height(), background='white')
        self.commentaire = Canvas(self.frame, height=15*self.fenetre.winfo_height(),
                                  width=self.fenetre.winfo_width()/3, background='white')
        self.add_ip = Canvas(self.ip, height=self.fenetre.winfo_height()/20,
                             width=self.fenetre.winfo_width(), background='white')
        self.commentaire.create_text(50, 15, fill='black', text="Commentaire")
        #association beetween keyboard and function
        self.filtre.bind("<Return>", lambda event: self.recupere_filtre())
        self.fenetre.bind("q", lambda event: self.exit())
        self.add_ip.pack()
        self.canvas.pack()
        self.commentaire.pack()

    def rectangle(self, liste: list, nb_ip: int):
        #Create rectangle which represent the frame
        canvas = self.canvas
        fenetre = self.fenetre
        cpt = self.compteur_trame
        type = len(liste)
        message: str = ""
        if (type == 1):
            rect = canvas.create_rectangle(0, cpt*fenetre.winfo_height()/20+30, nb_ip*2*fenetre.winfo_width() /
                                           18, (cpt+1)*fenetre.winfo_height()/20+30, fill='orange')
            #print comment for Ethernet frame
            message = "Ethertype 0x"+liste["ethernet"]["EtherType"]+" non supporté"
            com = self.commentaire.create_text(5, (cpt+1)*self.fenetre.winfo_height() /
                                               20+10, text=message, fill="black", anchor="w", justify="center")
            self.liste_commentaire.append(com)

        if (type == 2):
            rect = canvas.create_rectangle(0, cpt*fenetre.winfo_height()/20+30, nb_ip*2*fenetre.winfo_width() /
                                           18, (cpt+1)*fenetre.winfo_height()/20+30, fill='red')

        if (type == 3):
            rect = canvas.create_rectangle(0, cpt*fenetre.winfo_height()/20+30, nb_ip*2*fenetre.winfo_width() /
                                           18, (cpt+1)*fenetre.winfo_height()/20+30, fill='sky blue')
        if (type == 4):
            rect = canvas.create_rectangle(0, cpt*fenetre.winfo_height()/20+30, nb_ip*2*fenetre.winfo_width() /
                                           18, (cpt+1)*fenetre.winfo_height()/20+30, fill='light green')
        #add rectangle to a list (cf recupere_filtre)
        self.tab_trame.append(rect)
        self.compteur_trame += 1
        canvas.pack()

    def affichage_trame(self, liste_analyse: list):

        dico_pos: dict = {}
        nb_ip: int = 0
        liste_ip: list = []
        taille_rectangle = 2*self.fenetre.winfo_width() / 3
        cpt: int = 0
        ports_pos: int = 0

        # count number of different ip
        for dico_trame in liste_analyse:
            if len(dico_trame) > 1:
                if (dico_trame["ipv4"])["source_IP"] not in liste_ip:
                    liste_ip.append((dico_trame["ipv4"])["source_IP"])
                    nb_ip += 1

                if (dico_trame["ipv4"])["dest_IP"] not in liste_ip:
                    liste_ip.append((dico_trame["ipv4"])["dest_IP"])
                    nb_ip += 1
        position = 1
        #draw rectangle for every frames
        for liste in liste_analyse:
            self.rectangle(liste, nb_ip)
        self.nb_trame=self.compteur_trame

        # draw ip and line
        ip_texts: list = []
        for ip in liste_ip:
            add_ip = '.'.join(map(str, ip))
            text_ip = self.add_ip.create_text(position*taille_rectangle/(6), 25,
                                              fill="black", font=("Arial", 17), text=add_ip)
            ip_texts.append(text_ip)
            self.canvas.create_line(position*taille_rectangle/(6), 30, position *
                                    taille_rectangle/6, self.canvas.coords(self.tab_trame[self.compteur_trame-1])[3], fill="black", dash=(6, 2))
            dico_pos[add_ip] = position*taille_rectangle/(6)
            self.ordre_ip.append(add_ip)
            position += 1
        self.liste_ip = dico_pos
        flags: str = ""
        # draw tcp connections arrows, flags and description
        for ip in liste_ip:
            add_ip = '.'.join(map(str, ip))
            fact_height = 0.05
            for dico_trame in liste_analyse:
                #check if this frame has Layer 3
                if len(dico_trame) > 1 and dico_trame["ipv4"]["source_IP"] == ip:
                    dest_IP = '.'.join(map(str, dico_trame["ipv4"]["dest_IP"]))
                    x_source: float = dico_pos[add_ip]
                    x_dest: float = dico_pos[dest_IP]
                    y: float = self.fenetre.winfo_height() * fact_height+10
                    #check if this frame has Layer 4
                    if len(dico_trame) > 2:
                        if liste_ip.index(ip) < liste_ip.index(dico_trame["ipv4"]["dest_IP"]):
                            source = self.canvas.create_text(
                                x_source+2, y-5, text=dico_trame["tcp"]["SPN"], fill="red", anchor="e")
                            dest = self.canvas.create_text(
                                x_dest+2, y-5, text=dico_trame["tcp"]["DPN"], fill="blue", anchor="w")

                        else:
                            source = self.canvas.create_text(
                                x_source+2, y-5, text=dico_trame["tcp"]["SPN"], fill="red", anchor="w")
                            dest = self.canvas.create_text(
                                x_dest+2, y-5, text=dico_trame["tcp"]["DPN"], fill="blue", anchor="e")
                        self.tab_ports.append((source, dest))

                        ligne = self.canvas.create_line(x_source, y+5, x_dest, y+5, fill="black", arrow="last")
                        self.ligne.append(ligne)

                        for key, values in dico_trame["tcp"].items():
                            if values != 0 and cpt > 5 and cpt < 11:
                                flags += f"[{key}] "
                            cpt += 1
                        position = (dico_pos[add_ip]+dico_pos[dest_IP])/2
                        fla = self.canvas.create_text(position, y-5, text=flags, fill="black")
                        self.flags.append(fla)
                        # print comment for every frame except ethernet
                        type = list(dico_trame.keys())[-1]
                        commentaire: str = ""
                        if type == "tcp":
                            commentaire = "TCP : Seq : "+str(dico_trame["tcp"]["Sequence number"])+" Ack : "+str(dico_trame["tcp"]["Acknowledgment number"]
                                                                                                                 )+" Window : "+str(dico_trame["tcp"]["Window"])+" THL : "+str(dico_trame["tcp"]["THL"]*4)+" ("+str(dico_trame["tcp"]["THL"])+")"
                        if type == "http":
                            if dico_trame["http"]["Type"] == "requete":
                                commentaire = "HTTP : " + \
                                    dico_trame["http"]["URI"]+" "+dico_trame["http"]["Version"]
                            else:
                                commentaire = "HTTP : "+dico_trame["http"]["reponse version"]+" " + \
                                    dico_trame["http"]["Status code"]+" "+dico_trame["http"]["Response phrase"]
                        com = self.commentaire.create_text(5, y-10, text=commentaire,
                                                           fill="black", anchor="nw", justify="center")
                        self.liste_commentaire.append(com)
                    else:
                        ligne = self.canvas.create_line(x_source, y+5, x_dest, y+5, fill="black", arrow="last")
                        self.ligne.append(ligne)
                        type = list(dico_trame.keys())[-1]
                        if type == "ipv4":
                            commentaire = "Protocole IP 0x"+str(dico_trame["ipv4"]["protocol"])+" non supporté"
                            com = self.commentaire.create_text(
                                5, y-10, text=commentaire, fill="black", anchor="nw", justify="center")
                            self.liste_commentaire.append(com)

                fact_height += 0.05
        self.scroll()
        self.liste_analyse = liste_analyse
        self.filemenu.add_command(label="Save", command=self.save_filters)
        self.fenetre.bind("s", lambda event: self.save_filters())
        #print number of frame
        messagebox.showinfo("Nombre de trame", "Nombre de trame affiché : "+str(self.compteur_trame))

    def lancement(self):
        self.fenetre.mainloop()
        self.fenetre.attributes("-fullscreen", True)
