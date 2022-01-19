#!/bin/bash
echo "start"
ssh root@39.97.252.98 << eeooff

cd /data/fast-image-editor-server
sh deploy.sh
echo "success"

exit
eeooff
echo "end"