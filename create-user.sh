#!/bin/bash
echo "Execute os comandos abaixo no MySQL como root:"
echo ""
echo "CREATE USER 'invent'@'localhost' IDENTIFIED BY '';"
echo "GRANT ALL PRIVILEGES ON invent.* TO 'invent'@'localhost';"
echo "FLUSH PRIVILEGES;"
echo ""
echo "Depois execute: mysql -u invent invent"