import React, {useState} from "react";
import {observer} from "mobx-react";
import {Box, Button, DropButton, Layer, Text} from "grommet";
import {useStores} from "../hooks/useStores";
import styled from "styled-components";

export const UserAccount = observer(() => {
    const { accountStore } = useStores()
    const [isSignInModalOpened, setSignInModalOpened] = useState(true)

    const { userAddress } = accountStore

    return <Box>
        {accountStore.isSubscribed &&
            <Text>You are subscribed to page</Text>
        }
    </Box>
})
