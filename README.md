# DSS-Project
# Ciobanu Alin-Matei E-Gov Anul II

### BACKEND
Componenta de backend este dezvoltata in NestJs, un framework de Node: https://docs.nestjs.com/
Structura aplicatiei este urmatoarea:
- 3 foldere sub folderul src: board, list, card, fiecare avand un modul, controller si serviciu specifice.
- 3 entitati sub folderul schema: board.schema, card.schema, list.schema
- baza de date: mongodb

Schema bazei de date:
- board -> name si o referinta catre toate listele pe care le contine
- list -> name, o referinta catre toate cardurile pe care le contine si o refereninta catre parinte (board)
- card -> title, description si o referinta catre lista parinte

Api-uri:
- in fiecare controller avem api-urile CRUD (create, read, update si delete)
- cand sterg un board, sterg si toate listele si cardurile aferente din baza de date
- cand sterg o lista, sterg si toate cardurile continute in lista din baza de date

Backend & Database deployed
- pentru deploy-ul backend-ului am folosit Heroku, iar adresa la care se poate gasi serviciul de backend este: 
https://mighty-cove-24815-1b97431ee689.herokuapp.com/


- pentru hostarea bazei de date am folosit Atlas MongoDB, host-ul fiind urmatorul: cluster0.w8zpowl.mongodb.net
- credentiale pentru conectare: user=alinciobanu1604, password=jH74ld4h7z8csmkv

- in variabilele de mediu din serviciul de backend am setat: MONGODB_URI=mongodb+srv://alinciobanu1604:jH74ld4h7z8csmkv@cluster0.w8zpowl.mongodb.net/mongodb?retryWrites=true&w=majority pentru realizarea conexiunii intre componenta de backend de pe Heroku si baza de date de pe Atlas

### FRONTEND NEXTJS
In partea de frotend avem 2 pagini, pagina initiala, cea de home (/) in care sunt afisate un sticky bar si board-urile existente, putand sa adaugi un board de pe butonul Add board de pe sticky board. Cele 3 puncte (semnul de meniu) din dreapta fiecarui board permite editarea sau stergerea board-ului.

Facand click pe numele unui board suntem redirectionati catre a doua pagina, de forma /boards/:id.
In aceasta pagina avem afisate toate listele unui board, liste care contin cardurile proprii. Din nou, pe sticky bar avem posibilitatea de adaugare
a unei noi liste. Cele 3 puncte verticale (meniu) ne permit stergerea sau editarea unei liste (numele listei). Plusul din partea de jos a listei
permite adaugare unui nou card la lista respectiva. Dupa ce se adauga un card, acesta poate fi sters folosind butonul de X din dreptul cardului
sau editat, apasand pe titlul cardului.

In fisierul utils/api avem fisierele boardApi.js, listApi.js si cardApi.js care exporta functii de pentru comunicarea dintre frontend si backend.
In fisierul pages/index este randata prima pagina, cea de home, care foloseste in interior componenta Board.jsx pentru randarea bordurilor.
Pentru routing catre board/:id, am creat folder-ul pages/boards/[id] in care sunt randate restul componentelor.
In folder-ul modals din componente sunt modalele care se deschid in urma activitatilor: adaugare card, adaugare lista, editare card.

Frontend deployed
- pentru deploy-ul frontend-ului am folosit tot Heroku, adaugand ca variabila de mediu: 
  NEXT_PUBLIC_BASE_URL=https://mighty-cove-24815-1b97431ee689.herokuapp.com/
- adresa serviciului de frontend pentru interactiunea cu interfata: https://dssfrontend-39043daac022.herokuapp.com/


Am sters fisierul .next din frontend asa ca va trebui un npm run build.
