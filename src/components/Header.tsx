import React from "react";
import Link from "next/link";

//By default all components are server components
// rendered on the server side

const HeaderComp = () => {
  return (
    <header>
      THIS is a friggan header
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        <Link href="/tokendata">tokendata</Link>
      </div>
      <div>
        <Link href="/startrec">Start Reciept</Link>
      </div>
      <div>
        <Link href="/sendsol">Send Sol</Link>
      </div>
      <div>
        <Link href="/canvas">Canvas OG</Link>
      </div>
    </header>
  );
};

export default HeaderComp;
