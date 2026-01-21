import React, { PropsWithChildren } from 'react'
import { PageHeader } from '@/components/marketing/page-header'
import { PageFooter } from '@/components/marketing/page-footer'

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div>
            <PageHeader />
            {children}
            <PageFooter />
        </div>
    )
}
