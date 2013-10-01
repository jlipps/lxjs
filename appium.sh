source env.sh
UDID=""
if [[ $1 = "DRUMS1" ]]; then
    UDID="emulator-5554"
    PORT=$DRUMS1_PORT
    DPORT=$DRUMS1_DPORT
elif [[ $1 = "DRUMS2" ]]; then
    UDID="emulator-5556"
    PORT=$DRUMS2_PORT
    DPORT=$DRUMS2_DPORT
elif [[ $1 = "PIANO1" ]]; then
    UDID="emulator-5558"
    PORT=$PIANO1_PORT
    DPORT=$PIANO1_DPORT
elif [[ $1 = "PIANO2" ]]; then
    UDID="emulator-5560"
    PORT=$PIANO2_PORT
    DPORT=$PIANO2_DPORT
elif [[ $1 = "LYRICS" ]]; then
    PORT=$LYRICS_PORT
fi

pushd $APPIUM_HOME
if [[ $1 = "LYRICS" ]]; then
    node server.js -p $PORT
else
    node server.js -U $UDID -p $PORT -dp $DPORT
fi
