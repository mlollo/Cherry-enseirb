# Git Branch Tuto [Git Branching](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches)
- It's easier and safe to branch only on your local and merge on local. And don't push your branch on remote github.

## Create your branch for commit on a specific directory
- Example I want to commit on server
- `git branch server`
- `git checkout server`
- `git push -u origin server` to push a new branch on the server

## Push your local branch 'server' on the remote branch 'server
- `git checkout server`
- `git push origin server`
- !!!! Do not do `git push` on your branch !!!!  
- Il faut absolument séparer les push de chaque branche local et remote

## Fetch a branch created by your colleague
- `git fetch <remote> <rbranch>:<lbranch> `
- `git checkout <lbranch>`
- remmote for origin
- rbranch for remote branch
- lbranch for local branch

## Merge your branch
- `git checkout master`
- `git pull origin master`
- `git merge server`
- `git push origin master`

## Supprimer une branch
- Remotly `git push origin --delete server`
- Localy `git branch -d server`
