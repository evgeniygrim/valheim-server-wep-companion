#!/bin/bash

# Color for Bash
# Reset
Color_Off='\033[0m'       # Text Reset

# Regular Colors
Green='\033[0;32m'        # Green
Yellow='\033[0;33m'       # Yellow
Cyan='\033[0;36m'         # Cyan

client=1
server=1

dir=($PWD)
# Check client flag
if echo -e $* | grep -e "-c" -q 
  then
    server=0
    echo -e "$Color_Off";
    echo -e "$Cyan [ Rebuild client only ] ";
fi
# Check server flag
if echo -e $* | grep -e "-s" -q 
  then
    client=0
    echo -e "$Color_Off";
    echo -e "$Cyan [ Rebuild server only ] ";
fi
# Run client build
if [ $client -eq 1 ]
then
  cd "$dir/client"
  echo -e "$Color_Off";
  echo -e "$Yellow============= [ Start client ] =============";
  echo -e "$Color_Off";
  echo -e "path: $PWD"
  echo -e "$Color_Off";
  echo -e "$Yellow========= [ install node_modules ] =========";
  echo -e "$Color_Off";
  npm ci
  echo -e "$Color_Off";
  echo -e "$Yellow============= [ Build client ] =============";
  echo -e "$Color_Off";
  npm run build
  echo -e "$Color_Off";
  echo -e "$Green========= [ Build client success ] =========";
  echo -e "$Color_Off";
fi
# Run server build
if [ $server -eq 1 ]
then 
  cd "$dir/server"
  echo -e "$Color_Off";
  echo -e "$Yellow============= [ Start server ] =============" ; 
  echo -e "$Color_Off";
  echo -e "path: $PWD"
  echo -e "$Color_Off";
  echo -e "$Yellow========= [ install node_modules ] =========";
  echo -e "$Color_Off";
  npm ci
  echo -e "$Yellow============= [ Build server ] =============";
  echo -e "$Color_Off";
  npm run build
  echo -e "$Color_Off";
  echo -e "$Green========= [ Build client success ] =========";
  echo -e "$Color_Off";
  echo -e "$Yellow========= [ Run instance server ] ==========";
  echo -e "$Color_Off";
  pm2 restart app.config.js --env production
fi
#Show result
if [ "$client" -eq 1 ] && [ "$server" -eq 1 ]; then
  echo -e "$Color_Off";
  echo -e "$Green [ Rebuild App success ] ";
  echo -e "$Color_Off";
elif [ "$client" -eq 1 ]; then
  echo -e "$Color_Off";
  echo -e "$Green [ Rebuild client only success ] ";
  echo -e "$Color_Off";
elif [ "$server" -eq 1 ]; then
  echo -e "$Color_Off";
  echo -e "$Green [ Rebuild server only success ] ";
  echo -e "$Color_Off";
fi
