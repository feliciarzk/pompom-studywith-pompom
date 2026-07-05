import badan from "../assets/animation/potongan-badan.png";
import kepala from "../assets/animation/potongan-kepala.png";
import ekor from "../assets/animation/potongan-ekor.png";

function Pompom() {
  return (
    <>
      <div className="pompom-container">

        {/* BACKGROUND BLOBS */}

        <div className="blob blob1"></div>
        <div className="blob blob2"></div>

        <div className="dog-group">

          <img
            src={ekor}
            alt=""
            className="tail"
          />

          <img
            src={badan}
            alt=""
            className="body"
          />

          <div className="head-group">
            <img
              src={kepala}
              alt="PomPom"
              className="head"
            />
          </div>

        </div>

        <div className="shadow" />

      </div>

      <style>
        {`
          .pompom-container{
            position:relative;
            width:420px;
            height:420px;
            margin:40px auto 80px auto;
          }

          .blob{
            position:absolute;
            border-radius:50%;
            filter:blur(40px);
            z-index:0;
          }

          .blob1{
            width:180px;
            height:180px;
            background:#FFD8B4;

            left:20px;
            top:40px;
          }

          .blob2{
            width:160px;
            height:160px;
            background:#FFE7CC;

            right:20px;
            bottom:70px;
          }

          .dog-group{
            position:relative;
            width:100%;
            height:100%;
            z-index:2;

            animation:
              dogFloat 2.5s ease-in-out infinite;
          }

          .pompom-container img{
            position:absolute;
            user-select:none;
            pointer-events:none;
          }

          /* BODY */

          .body{
            width:240px;

            left:90px;
            top:140px;

            z-index:2;
          }

          /* HEAD */

          .head-group{
            position:absolute;

            left:78px;
            top:45px;

            width:220px;
            height:220px;

            z-index:3;

            transform-origin:center bottom;

            animation:
              lookAround 4s ease-in-out infinite;
          }

          .head{
            width:220px;
          }

          /* TAIL */

          .tail{
            width:145px;

            left:250px;
            top:155px;

            z-index:1;

            transform-origin:left center;

            animation:
              wag .4s infinite alternate;
          }

          /* SHADOW */

          .shadow{
            position:absolute;

            width:170px;
            height:24px;

            background:rgba(0,0,0,.12);

            border-radius:999px;

            filter:blur(12px);

            bottom:20px;
            left:125px;

            animation:
              shadowPulse 2.5s ease-in-out infinite;
          }

          @keyframes dogFloat{

            0%{
              transform:translateY(0px);
            }

            50%{
              transform:translateY(-8px);
            }

            100%{
              transform:translateY(0px);
            }
          }

          @keyframes lookAround{

            0%{
              transform:rotate(-3deg);
            }

            25%{
              transform:rotate(-1deg);
            }

            50%{
              transform:rotate(3deg);
            }

            75%{
              transform:rotate(1deg);
            }

            100%{
              transform:rotate(-3deg);
            }
          }

          @keyframes wag{

            from{
              transform:rotate(-12deg);
            }

            to{
              transform:rotate(12deg);
            }
          }

          @keyframes shadowPulse{

            0%{
              transform:scale(1);
              opacity:.15;
            }

            50%{
              transform:scale(.9);
              opacity:.08;
            }

            100%{
              transform:scale(1);
              opacity:.15;
            }
          }
        `}
      </style>
    </>
  );
}

export default Pompom;