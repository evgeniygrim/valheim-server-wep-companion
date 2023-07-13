#!/bin/bash

# Color for Bash
# Reset
Color_Off='\033[0m'       # Text Reset

# Regular Colors
Green='\033[0;32m'        # Green
Yellow='\033[0;33m'       # Yellow
Cyan='\033[0;36m'         # Cyan


echo -e "$Cyan You can use a special flags to deploy: $Color_Off";
echo -e "   -s : for the deployment server only";
echo -e "   -c : for the deployment clien only";

client=0
server=0

dir=($PWD)
if (( $# == 0 )); then
  client=1
  server=1
  echo -e "$Color_Off";
  echo -e "$Cyan [ Deploy App ] ";
fi
# Check client flag
if echo -e $* | grep -e "-c" -q 
  then
    client=1
    echo -e "$Color_Off";
    echo -e "$Cyan [ Rebuild client only ] ";
fi
# Check server flag
if echo -e $* | grep -e "-s" -q 
  then
    server=1
    echo -e "$Color_Off";
    echo -e "$Cyan [ Rebuild server only ] ";
fi
# Run client build
if [ $client -eq 1 ]
then
  cd "$dir/client"
  echo -e "$Color_Off";
  echo -e "$Yellow============= [ Start client ] =============$Color_Off";
  echo -e "$Color_Off";
  echo -e "$Yellow client path is: $Color_Off $PWD"
  echo -e "$Color_Off";
  echo -e "$Yellow========= [ install node_modules ] =========$Color_Off";
  npm ci
  echo -e "$Color_Off";
  echo -e "$Yellow============= [ Build client ] =============$Color_Off";
  npm run build
  echo -e "$Color_Off";
  echo -e "$Green========= [ Build client success ] =========$Color_Off";
  echo -e "$Color_Off";
fi
# Run server build
if [ $server -eq 1 ]
then 
  cd "$dir/server"
  echo -e "$Color_Off";
  echo -e "$Yellow============= [ Start server ] =============$Color_Off" ; 
  echo -e "$Color_Off";
  echo -e "$Yellow server path is: $Color_Off $PWD"
  echo -e "$Color_Off";
  echo -e "$Yellow========= [ install node_modules ] =========$Color_Off";
  npm ci
  echo -e "$Color_Off";
  echo -e "$Yellow============= [ Build server ] =============$Color_Off";
  npm run build
  echo -e "$Green========= [ Build client success ] =========$Color_Off";
  echo -e "$Color_Off";
  echo -e "$Yellow========= [ Run instance server ] ==========$Color_Off";
  echo -e "$Color_Off";
  pm2 restart app.config.js --env production
fi
#Show result
if [ "$client" -eq 1 ] && [ "$server" -eq 1 ]; then
  echo -e "$Color_Off";
  echo -e "$Green [ Deploy App success ] ";
  echo -e "$Color_Off";
elif [ "$client" -eq 1 ]; then
  echo -e "$Color_Off";
  echo -e "$Green [ Deploy client only success ] ";
  echo -e "$Color_Off";
elif [ "$server" -eq 1 ]; then
  echo -e "$Color_Off";
  echo -e "$Green [ Deploy server only success ] ";
  echo -e "$Color_Off";
fi
