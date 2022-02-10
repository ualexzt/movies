import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../../firebaseConfig';
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Movie, User } from '../../../types';
import { FormikState } from 'formik';

export const uploadImage = (file: any) => {
  if (!file) return;
  console.log(file.name);
  const storageRef = ref(storage, `/image/${Date.now()}.jpg`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (err) => {
      console.log(err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log(url);
        // addMovieForm.setFieldValue('img', url);
      });
    }
  );
};

export const addNewMovie = async (
  user: User | null,
  values: Movie,
  resetForm: (nextState?: Partial<FormikState<Movie>> | undefined) => void
) => {
  try {
    const docRef = await addDoc(collection(db, 'movies'), {
      title: values.title,
      director: values.director,
      description: values.description,
      duration: values.duration,
      price: values.price,
      featured: values.featured,
      img: 'https://upload.wikimedia.org/wikipedia/ru/thumb/6/6e/Spider-Man_%E2%80%94_No_Way_Home_poster.jpg/640px-Spider-Man_%E2%80%94_No_Way_Home_poster.jpg',
      author: user?.email,
      rate: 0,
    });
    resetForm();
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const editMovie = async (values: Movie, paramId: string) => {
  try {
    const updateMovie = doc(db, 'movies', `${paramId}`);
    await updateDoc(updateMovie, {
      title: values.title,
      director: values.director,
      description: values.description,
      duration: values.duration,
      price: values.price,
      featured: values.featured,
      rate: values.rate,
    });
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
  }
};

export const getMovie = async (id: string | undefined) => {
  const docRef = doc(db, 'movies', `${id}`);
  try {
    return await getDoc(docRef);
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
  }
};

export const deleteMovie = async (id: string | undefined) => {
  try {
    await deleteDoc(doc(db, 'movies', `${id}`));
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
  }
};
