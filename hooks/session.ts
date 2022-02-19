
import { Session } from "next-auth"
import { useSession as _useSession, UseSessionOptions } from "next-auth/react"

interface SessionStatus {
    loading: boolean
    authenticated: boolean
    unauthenticated: boolean
}

interface UseSessionResult {
    session: Session|null
    status: SessionStatus
}

export function useSession(options?: UseSessionOptions<boolean>): UseSessionResult {
    const { data: session, status } = _useSession<boolean>(options)
    
    const _status: SessionStatus = {
        loading: status === "loading",
        authenticated: status === "authenticated",
        unauthenticated: status === "unauthenticated",
    }

    return {
        session,
        status: _status,
    }
}