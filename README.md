westport-police
===============

Use the iMedia Node Server and pull the latest in the other project to ensure you get the correct nginx config

clone



in the repo run
```bash
$ ln -s /home/imedia/westport-police/westport-police.nginx /etc/nginx/sites-enabled/westport-police
$ service nginx restart
$ npm install
$ git branch {yourname}
$ git checkout {yourname}
$ git commit -am '{yourname branch}'
# work work work
$ git commit status #to view unstaged changes
$ git add {dir/*} #repeat for each dir
$ git commit -am '{your commit message}'
$ git push origin {yourname}
