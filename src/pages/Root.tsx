import React, { useState } from 'react'
import {Box, Button, Text} from "grommet";
import Countdown from 'react-countdown';
import config from '../config'
import { observer } from 'mobx-react';
import { useStores } from '../hooks/useStores';
import styled, { css } from 'styled-components';

const ImageContainer = styled(Box)<{ isLocked: boolean }>`
  transition: transform 200ms;

  ${({ isLocked }) => !isLocked && css`
      :hover {
        transform: scale(1.05);
      }
  `}

  ${({ isLocked }) => isLocked && css`
    filter: grayscale(100%);
    opacity: 0.8;
    cursor: default;
  `}
`

const ListItem = (props: { name: string, isLocked: boolean, link: string }) => {
    const { isLocked, link } = props

    const onClick = () => {
        if(!isLocked) {
            window.open(link, '_blank')
        }
    }

    return <ImageContainer
        isLocked={isLocked}
        background={`url('${props.name}')`}
        height="350px"
        width="350px"
        border={{ color: "brand", size: "1px" }}
        round={'8px'}
        margin={{ bottom: '32px' }}
        onClick={onClick}
    />
}

export const Root = observer(() => {
    const { accountStore } = useStores()
    const [paymentMode] = useState<'payment' | 'subscription'>('payment')

    const checkoutLink = `${config.apiUrl}/stripe/checkout?mode=${paymentMode}`
    const onSubscribeClicked = () => window.open(checkoutLink, '_self')

    const onUnsubscribeClicked = () => {
        accountStore.setIsSubscribed(false)
    }

    const isLocked = !accountStore.isSubscribed

    const listItemProps = {
        isLocked,
        onSubscribeClicked
    }

    return <Box gap={'32px'}>
        <Box direction={'row'} align={'center'} gap={'32px'}>
            {/*<Select*/}
            {/*    options={['payment', 'subscription']}*/}
            {/*    value={paymentMode}*/}
            {/*    onChange={({ option }) => setPaymentMode(option)}*/}
            {/*/>*/}
            {accountStore.isSubscribed &&
                <Box direction={'row'} gap={'48px'} justify={'center'} align={'center'}>
                    <Box>
                        <Text size={'small'} color={'gray'}>Subscription status:</Text>
                        <Text>Active</Text>
                    </Box>
                    <Box>
                        <Text size={'small'} color={'gray'}>Subscription expire:</Text>
                        <Countdown date={accountStore.getSubscriptionEndTime()} />
                    </Box>
                    <Box>
                        <Button primary size={'large'} onClick={onUnsubscribeClicked}>
                            Unsubscribe
                        </Button>
                    </Box>
                </Box>
            }
            {!accountStore.isSubscribed &&
                <Box direction={'row'} gap={'48px'} justify={'center'} align={'center'}>
                    <Box>
                        <Text size={'small'} color={'gray'}>Subscription status:</Text>
                        <Text>Inactive</Text>
                    </Box>
                    <Box>
                        <Button primary size={'large'} onClick={onSubscribeClicked}>
                            Subscribe ($1)
                        </Button>
                    </Box>
                </Box>
            }
        </Box>
        <Box direction={'row'} gap={'32px'} wrap>
            <ListItem {...listItemProps} name={'image1.jpeg'} link={'https://youtu.be/O1dgtYkfQZU'} />
            <ListItem {...listItemProps} name={'image2.jpeg'} link={'https://youtu.be/LdWq6tBkstQ'} />
            <ListItem {...listItemProps} name={'image3.jpeg'} link={'https://youtu.be/pb-j3svRQLI'} />
            <ListItem {...listItemProps} name={'image4.jpeg'} link={'https://youtu.be/Ex2iAyaEElQ'} />
            <ListItem {...listItemProps} name={'image5.jpeg'} link={'https://youtu.be/zdbPKzo2ShQ'} />
        </Box>
    </Box>
})
