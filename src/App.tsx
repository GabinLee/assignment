import { useEffect, useState } from 'react';
import './reset.scss';
import './global.scss';
import axios from 'axios';
import styled, { css } from 'styled-components';


export default function App() {
  const [profileList] = useState([
    { image: 'profile1', title: 'Sed ut perspiciatis', description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.' },
    { image: 'profile2', title: 'Lorem ipsum dolor', description: 'Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.' },
    { image: 'profile3', title: 'Nemo enim ipsam', description: 'Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor.' }
  ]);
  
  const [fullBleedImage, setFullBleedImage] = useState('');

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>();

  useEffect(() => {
    const fullImage = localStorage.getItem('fullBleedImage');

    console.log(fullImage, 'fullImage');
    
    if(fullImage === null) {
      getFullBleedImage();
    } else{
      setFullBleedImage(fullImage);
    }
  }, [])

  useEffect(() => {
    setEmail(email.replace(/\s/g, ""));

    const validEmail = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{2,3}$/;
    
    if(email !== ''){
      if(validEmail.test(email) === false){
        setIsValidEmail(false);
      } else{
        setIsValidEmail(true);
      }
    } else{
      setIsValidEmail(undefined);
    }
  }, [email])

  const getFullBleedImage = () => {
    axios.get(`https://api.unsplash.com/photos/random`, {
      params: {
        client_id: 'RfZSbn_rdvEPrnhslq8HRwmCwyayZg3DBo_LDcXXaTM'
      }
    })
    .then(response => {
      if(response.data){
        localStorage.setItem('fullBleedImage', response.data.urls.full);
        setFullBleedImage(response.data.urls.full);
      } else{
        alert('error');
      }
    }).catch(error => console.log(error))
  }

  return (
    <Container className="app"
      $fullImage={fullBleedImage}
    >
      <div className='head_text'>
        <p className='exo2_regular'>Snap photos and share like<br />never before</p>
      </div>

      <ul className='profile_list'>
        {profileList.sort(() => Math.random() - 0.5).map((profile, index) => (
          <li key={`profile${index}`}>
            <img src={`images/${profile.image}.png`} alt={profile.title} />
            <p className='profile_title montserrat_bold'>{profile.title}</p>
            <p className='profile_description montserrat_regular'>{profile.description}</p>
            <a href='/' className='profile_more exo2_bold'>Learn more</a>
          </li>
        ))}
      </ul>

      <div className='full_bleed'>
        <div className='inner'>
          <p className='txt_title full_bleed_title montserrat_bold'>Sed ut perspiciatis unde omnis</p>
          <p className='txt_description montserrat_regular'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.</p>
          <div className='divider' />
          <p className='txt_sub montserrat_regular'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.</p>

          <div className='subscribe'>
            <p className='subscribe_title exo2_bold'>Subscribe to our newsletter</p>

            <div className={`subscribe_input${isValidEmail === undefined ? '' : isValidEmail ? ' valid' : ' invalid'}`}>
              <input className='exo2_regular' placeholder='Enter your email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              
              <button
                disabled={isValidEmail === false}
              />

            {(isValidEmail === false) && (
              <p className='error_txt exo2_light'>Please enter a valid email!</p>
            )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}


const Container = styled.div<{ $fullImage: string}>`
  .head_text{
    min-width: 1680px;
    max-width: 1680px;
    margin: 0 auto;
    padding: 120px 850px 36px 80px;
    p{
      font-size: 48px;
      line-height: 1.5;
      letter-spacing: -0.72px;
    }
  }

  .profile_list{
    min-width: 1680px;
    max-width: 1680px;
    margin: 0 auto;
    padding: 34px 80px 110px;
    display: flex;

    li{
      width: calc((100% - 40px) * 1/3);
      + li{
        margin-left: 20px;
      }

      img{
        width: 108px;
        height: 108px;
        margin-bottom: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

      .profile_{
        &title{
          margin: 0 0 24px;
          font-size: 24px;
          line-height: 1.5;
          letter-spacing: -0.36px;
        }
        &description{
          margin: 0 0 24px;
          color: rgba(0, 0, 0, 0.8);
          font-size: 18px;
          line-height: 1.67;

          letter-spacing: -0.27px;
        }
        &more{
          color: #18a0fb;
          font-size: 18px;
          line-height: 1.67;
          letter-spacing: -0.27px;
          text-transform: uppercase;
        }
      }
    }
  }

  .full_bleed{
    ${props => props. $fullImage && css`
      background: url(${props. $fullImage}) no-repeat center center / cover;
    `}
    position: relative;

    &::before{
      content: '';
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      left: 0;
    }

    .inner{
      min-width: 1680px;
      max-width: 1680px;
      margin: 0 auto;
      padding: 152px 80px;
      position: relative;
      .txt{
        &_title{
          margin-bottom: 23px;
          color: #fff;
          font-size: 24px;
          line-height: 1.5;
          letter-spacing: -0.36px;
          text-align: center;
        }

        &_description{
          color: rgba(255, 255, 255, 0.8);
          font-size: 18px;
          line-height: 1.67;
          letter-spacing: -0.27px;
          text-align: center;
        }

        &_sub{
          margin-bottom: 95px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          line-height: 1.57;
          letter-spacing: -0.21px;
          text-align: center;
        }
      }

      .divider{
        height: 1px;
        margin: 32px 0;
        background-color: rgba(255, 255, 255, 0.5);
      }

      .subscribe{
        &_title{
          margin: 0 0 16px;
          color: #fff;
          font-size: 16px;
          line-height: normal;
          letter-spacing: -0.24px;
          text-align: center;
        }

        &_input{
          width: 500px;
          height: 50px;
          margin: 0 auto;
          position: relative;

          input{
            width: 100%;
            height: 100%;
            padding: 4px 50px 4px 16px;
            border: solid 1px #fff;
            border-radius: 7px;
            color: #fff;
            font-size: 16px;
            line-height: normal;
            letter-spacing: -0.24px;
            text-align: left;
            background-color: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);

            &::placeholder{
              color: #fff;
            }

            &:focus{
              outline: none;
            }
          }

          button{
            width: 32px;
            height: 32px;
            border: none;
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
          }

          .error_txt{
            margin: 9px 0 0 16px;
            color: #f63;
            font-size: 16px;
            line-height: normal;
            letter-spacing: -0.24px;
          }

          &.valid{
            input{
              border-color: #00c300;
            }
          }

          &:not(.invalid){
            button{
              background: url(images/subscribe.png) no-repeat center center / cover;
            }
          }

          &.invalid{
            input{
              border-color: #f63;
            }
            button{
              background: url(images/subscribe_gray.png) no-repeat center center / cover;

            }
          }
        }
      }
    }
  }
`