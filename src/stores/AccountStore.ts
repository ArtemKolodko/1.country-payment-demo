import { makeAutoObservable } from "mobx";

export const SubscriptionTimeout = 10 * 60 * 1000

enum StorageKey {
    userAddress = 'userAddress',
    isSubscribed = 'isSubscribed',
    subscriptionStart = 'subscriptionStart',
}

export class AccountStore {
    constructor() {
        makeAutoObservable(this)
        this.init()
    }

    public userAddress: string = ''
    public isSubscribed: boolean = false
    public subscriptionStart: number = 0

    init () {
        const userAddress = this.getStorageKey(StorageKey.userAddress)
        if (userAddress) {
            this.setAddress(userAddress)
        }
        const isSubscribed = this.getStorageKey(StorageKey.isSubscribed)
        if(isSubscribed === 'true') {
            const timestamp = this.getStorageKey(StorageKey.subscriptionStart)
            if(timestamp) {
                const subscriptionStart = +timestamp
                if(Date.now() - subscriptionStart < SubscriptionTimeout) {
                    const subscriptionEnds = SubscriptionTimeout - (Date.now() - subscriptionStart)
                    this.setIsSubscribed(!!isSubscribed, subscriptionStart,false)
                    setTimeout(() => {
                        this.setIsSubscribed(false, 0,true)
                    }, subscriptionEnds)
                    console.log('Subscription ends in ', subscriptionEnds / 1000, 's')
                    return
                }
            }
        }
        this.setIsSubscribed(false, 0,true)
    }

    public setAddress (address: string) {
        this.userAddress = address
    }

    public setIsSubscribed (isSubscribed: boolean, subscriptionStart = Date.now(), updateStorage = true) {
        this.isSubscribed = isSubscribed
        this.subscriptionStart = subscriptionStart
        if(updateStorage) {
            this.setStorageKey(StorageKey.isSubscribed, String(isSubscribed))
            this.setStorageKey(StorageKey.subscriptionStart, String(subscriptionStart))
        }
    }

    public getSubscriptionEndTime () {
        return this.subscriptionStart + SubscriptionTimeout
    }

    private setStorageKey (key: StorageKey, value: string) {
        window.localStorage.setItem(key, value)
    }

    private getStorageKey (key: StorageKey) {
        return window.localStorage.getItem(key)
    }
}
