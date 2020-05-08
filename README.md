1. [About](https://github.com/jwest115/GlobaltraQs/blob/master/README.md#about)
1. [Rules](https://github.com/jwest115/GlobaltraQs/blob/master/README.md#rules)
1. [Instructions](https://github.com/jwest115/GlobaltraQs/blob/master/README.md#globaltraqs) 
1. [Running](https://github.com/jwest115/GlobaltraQs/blob/master/README.md#running)
1. [Screenshots](https://github.com/jwest115/GlobaltraQs/blob/master/README.md#screenshots)



# About

Senior Design Project of redesigning of the website : [GlobalTraQs](http://globaltraqs.com/)
Still In Development

# Rules 
Contribution Rules

✔️ Never work on master branch!


✔️ Create a new branch for each set of related bugs or set of related tasks, naming by:


type_PascalCase, example: feat_CareerPage, bug_CareerEmail.


Common short type tokens: wip (work in progress), feat (feature or design), bug (bug fixes)


💻 command to create new branch locally: git checkout -b bug_CareerEmail


⚠️ Important: Before creating a branch, check if someone already started to work on this task and if there's already a branch created for this task, and if there is, please checkout and track the branch with the 💻 command: git checkout --track origin/bug_CareerEmail


--track shorthand for git checkout -b [branch] [remotename]/[branch] where remote name is origin and branch is the specific branch you're pulling from the origin remote


Right after creating a new branch, push it to remote to make it available for everyone, defining the upstream


💻 command: git push -u origin bug_CareerEmail


✔️ Everyday after working, push your local branch updates to remote branch.


⚠️ Important: make sure you're on the correct branch... and push


With 💻 command: git push


✔️ Finished with the task and want to merge?


Fix conflicts if needed, usually happens when more than 1 developer is working on the same file on different branches - communicate with the other developer to make sure their work was not removed


Please make the merge/pull request with as much detail about what you've done/added.


Or lead will merge your branch to master for you. Just ask!


# GlobaltraQs

developmental version: http://globaltraqsdev.com/

# settings.ini

1. open up settings.ini

1. Development Set Debug = True; Production = False

1. Input DB info * could use local postgres or sqlite. Ask for Online DB

1. Input Email Info *dont use your personal email. Ask for Email prod

# first terminal

1. install Python 3.7, pip 

1. pip install pipenv

1. pipenv install

1. pipenv shell

1. cd GlobalTraqs

1. python manage.py makemigrations

1. python manage.py migrate

1. python manage.py runserver

# second terminal

1. install latest version of node

1. npm install

1. npm run dev

clear cache in browser

# Running

1. Go to http://127.0.0.1:8000/admin/ and log into superuser account
1. Click Groups
1. Create groups (Administrators, Moderators, and Anonymous)
1. Assign appropriate permissions (will add more permissions later)
1. http://127.0.0.1:8000/api/category 
    1. add Personal, Historical, Community 
    1. Adds the categories

# ScreenShots

![HomePage](GlobalTraqs/media/media/Home.png)

![SearchSideBar](GlobalTraqs/media/media/Home_SideBar_Search.png)

![ViewStory](GlobalTraqs/media/media/ViewStory.png)

![StorySideBarSearch](GlobalTraqs/media/media/home_sidebar.png)
