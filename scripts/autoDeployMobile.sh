echo "----- MOBILE shell script exec start -----" >> /home/ubuntu/auto-deploy/logs/log
cd /home/ubuntu/sassy_mobile_final
unset $(git rev-parse --local-env-vars)
forever stop bin/www
git stash
git pull origin master
git stash apply
forever start bin/www
echo "-----MOBILE shell script executed end-----" >> /home/ubuntu/auto-deploy/logs/log