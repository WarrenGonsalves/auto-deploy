echo "----- MOBILE shell script exec start -----" >> /home/ubuntu/auto-deploy/logs/log
cd /home/ubuntu/sassy_mobile_final
unset $(git rev-parse --local-env-vars)
forever stop www
git stash
git pull origin master
git stash apply
forever start www
echo "-----MOBILE shell script executed end-----" >> /home/ubuntu/auto-deploy/logs/log