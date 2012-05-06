"""
 make a module and load them
"""
class Mod:
    def __init__(self,name,css,js):
        self.name=[]
        if name:
            self.name.append(name+".mod.html")
        self.css=css
        self.js=js
        
    def __str__(self):
        return str(self.name)
    
    def __add__(self,other):
        self.name += other.name
        self.js +=other.js
        self.css += other.css
        return self
    
    def to_template(self,cxt):
        return {
            "js" : self.__uniqe_list(self.js),
            "css" : self.__uniqe_list(self.css),
            "tm" : self.__uniqe_list(self.name),
            "cxt" : cxt,
            }
        
    def __uniqe_list(self,lst):
        uniq=[]
        for x in lst:
            if x not in uniq:
                uniq.append(x)
        return uniq

def mod_sum():
    return Module("",[],[])

mods= {  
"basic": Mod(
                    "basic",
        ["reset.css"   ,"note-common.css"],
        ["jquery-min.js","tpls.js"]
        ),
"head": Mod(
        "head",
        ['head.mod.css'],
        ['head.mod.js']
        ),
"footer":Mod(
        "",
        ["footer.mod.css"],
        [],
        ),
}

