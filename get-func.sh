if [ ! -f "func" ]
then 
  wget https://github.com/knative/func/releases/download/knative-v1.9.0/func_linux_amd64 -O func
  chmod +x func
fi
