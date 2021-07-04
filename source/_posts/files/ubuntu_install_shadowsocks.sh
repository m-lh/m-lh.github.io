#!/bin/bash
# 使用root权限执行
apt install python3 python3-pip
pip3 install git+https://github.com/shadowsocks/shadowsocks.git@master
cat > /etc/shadowsocks.json << EOF
{
    "server":"0.0.0.0",
    "server_port":443,
    "password":"qwe",
    "timeout":300,
    "method":"aes-256-cfb"
}
EOF
ssserver -c /etc/shadowsocks.json -d start

