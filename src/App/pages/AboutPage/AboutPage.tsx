import React from 'react';
import aboutUsImg from 'assets/aboutus.png';
import ourMissionsImg from 'assets/ourmissions.png';
import ourStoryImg from 'assets/ourstory.png';
import ourValuesImg from 'assets/ourvalues.png';
import Text from 'components/Text';
import s from './AboutPage.module.scss';

const AboutPage = () => {
  return (
    <div className={s['about-page']}>
      <Text tag="h1" view="title">
        About us
      </Text>
      <div className={s['container']}>
        <div className={s['container__text-left']}>
          <Text view="title">Welcome to Lalasia</Text>
          <Text view="p-20" className={s['container__text_left']}>
            At Lalasia, we are passionate about bringing you the finest products that combine quality, style, and
            affordability. Our journey began with a vision to create a shopping experience that is not just about
            products but about creating moments of joy and satisfaction for our customers.
          </Text>
        </div>
        <div className={s['container__image-right']}>
          <img src={aboutUsImg} className={s['container__image']} />
        </div>
      </div>
      <div className={s['container']}>
        <div className={s['container__image-left']}>
          <img src={ourStoryImg} className={s['container__image']} />
        </div>
        <div className={s['container__text-right']}>
          <Text view="title">Our Story</Text>
          <Text view="p-20" className={s['container__text_right']}>
            Discover the story behind Lalasia, from its humble beginnings to where we are today. Founded by a team of
            dedicated individuals who share a love for unique and exquisite items, Lalasia has grown into a destination
            for those seeking something special.
          </Text>
        </div>
      </div>
      <div className={s['container']}>
        <div className={s['container__text-left']}>
          <Text view="title">Our Mission</Text>
          <Text view="p-20" className={s['container__text_left']}>
            At Lalasia, our mission is simple: to provide you with a curated selection of products that inspire and
            delight. We strive to offer a seamless shopping experience, exceptional customer service, and products that
            reflect our commitment to quality and style.
          </Text>
        </div>
        <div className={s['container__image-right']}>
          <img src={ourMissionsImg} className={s['container__image']} />
        </div>
      </div>
      <div className={s['container']}>
        <div className={s['container__image-left']}>
          <img src={ourValuesImg} className={s['container__image']} />
        </div>
        <div className={s['container__text-right']}>
          <Text view="title">Our Values</Text>
          <Text view="p-20" className={s['container__text_right']}>
            Transparency, integrity, and customer satisfaction are at the core of everything we do. We value your trust
            and aim to build lasting relationships with our customers based on honesty, respect, and reliability.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
