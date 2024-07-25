from graphique import *
from decodeur import *


def browse_files():
    filename = filedialog.askopenfilename(initialdir="/", title="Select a File",
                                          filetypes=(("Text files", "*.txt"), ("all files", "*.*")))
    return filename


def open_file(window):
    file = filedialog.askopenfilename()
    content = (open(file)).read()
    trace_list = read_trace(content, offset=False)
    return trace_list


window = Tk()
window.title('File Explorer')
trace_list: list = []
#button_exp = Button(window, text="browse files", command=open_file(window))
trace_list = open_file(window)
#lb = Label(text=len(trace_list))
# lb.pack()
#text = Text(window, width=window.winfo_width(), height=window.winfo_height())
#text.insert(END, f'frame\t|source IP\t|dest IP\t\n')
legende: list = ["Frame nb", "Source IP", "Dest IP", "Source Port number", "Dest Port number"]
Label(text=legende[0]).grid(column=0, row=0)
Label(text=legende[1]).grid(column=1, row=0)
Label(text=legende[2]).grid(column=2, row=0)
Label(text=legende[3]).grid(column=3, row=0)
Label(text=legende[4]).grid(column=4, row=0)
#Label(text=legende[5]).grid(column=5, row=0)

for i in range(0, len(trace_list)):
    #text.insert(END, f'{i}\t|{trace_list[i]["ipv4"]["source_IP"]}\t|{trace_list[i]["ipv4"]["dest_IP"]}\t\n')
    Label(text=i).grid(column=0, row=i+len(legende))
    Label(text=trace_list[i]["ipv4"]["source_IP"], width=20).grid(column=1, row=i+len(legende))
    Label(text=trace_list[i]["ipv4"]["dest_IP"], width=20).grid(column=2, row=i+len(legende))
    Label(text=trace_list[i]["tcp"]["SPN"], width=20).grid(column=3, row=i+len(legende))
    Label(text=trace_list[i]["tcp"]["DPN"], width=20).grid(column=4, row=i+len(legende))

# text.pack()
window.mainloop()
