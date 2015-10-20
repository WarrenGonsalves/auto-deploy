echo "----- shell script exec start -----" >> /home/ubuntu/auto-deploy/logs/log
cd /home/ubuntu/handz_services
unset $(git rev-parse --local-env-vars)
forever stop server.js
git pull origin feature/product
npm install
forever start server.js
echo "-----shell script executed end-----" >> /home/ubuntu/auto-deploy/logs/log