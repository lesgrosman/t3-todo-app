import { signIn, signOut, useSession } from "next-auth/react";

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const { data: sessionData } = useSession();

  const handleClick = () => sessionData ? void signOut() : void signIn()

  return (
    <main>
      <div className="navbar bg-neutral text-neutral-content">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">TODO</a>
        </div>
        <div className="flex-none">
          <button
            className="btn btn-secondary"
            onClick={handleClick}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
        </div>
      </div>
      <div className='max-w-4xl mx-auto sm:px-10 px-4 pb-24 sm:pb-44 pt-16 bg-slate-300 h-screen'>
        {children}
      </div>
    </main>
  )
}

export default Layout;
