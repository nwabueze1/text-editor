import ButtonContained from "@/components/Button/ButtonContained";
import Input from "@/components/Input";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import style from "../styles/Home.module.css";

const RichTextEditor = dynamic(() => import("@/components/Editor"), {
  ssr: false,
});

export default function Home() {
  const [title, setTitle] = useState("");
  return (
    <>
      <Head>
        <title>Text Editor</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
          integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <main>
        <div className={style.home}>
          <div className={style.content}>
            <div className={style.box}>
              <div className={style.divider} />
              <div className={style.titleBar}>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title"
                />
                <RichTextEditor />
              </div>
              <div className={style.footer}>
                <p
                  style={{
                    fontSize: "9px",
                    margin: 0,
                    textAlign: "end",
                    marginRight: 20,
                  }}
                >
                  0/1000 words
                </p>
              </div>
            </div>
            <ButtonContained>Post</ButtonContained>
          </div>
        </div>
      </main>
    </>
  );
}
