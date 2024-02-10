import { AlertTriangle } from 'lucide-react'
import React from 'react'

import { CardWrapper } from '../../../components/card-wrapper'

export default function Error() {
  return (
    <CardWrapper
      header="Error!"
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center justify-center gap-x-2 text-center">
        <AlertTriangle className="h-4 w-4  text-destructive" />
        <p>Oops! Something wen't wrong!</p>
      </div>
    </CardWrapper>
  )
}
