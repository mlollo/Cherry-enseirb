# Git Branch Tuto

## Create your branch for commit on a specific directory
- Example I want to commit on server
- `git branch server`
- `git checkout server`
- `git push -u origin server` to push a new branch on the server

## Merge your branch
- `git checkout master`
- `git pull origin master`
- `git merge server`
- `git push origin master`

## Supprimer une branch
- Remotly `git push origin --delete server`
- Localy `git branch -d server`
