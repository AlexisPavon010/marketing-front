import { Document, Page, Text, View, Image, PDFViewer } from '@react-pdf/renderer';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { getPostById } from '../../api';
import { IPost } from '../../interfaces/Post';
import { styles } from './styles';

export const PdfViewer = () => {
  const [post, setPost] = useState<IPost>()
  const { id } = useParams()

  useEffect(() => {
    if (!id) return
    getPostById(id)
      .then(({ data }) => {
        setPost(data)
      })
      .catch()
      .finally()
  }, [])

  return (
    <PDFViewer style={{ width: "100%", height: "100vh", overflow: 'hidden' }}>
      <Document>
        <Page size="A4">
          <View
            style={styles.page}
          >
            <Text style={styles.username}>
              {post?.username}
            </Text>
            <Text style={styles.title}>
              Título:  {post?.title}
            </Text>
            <Text style={styles.category}>
              Categoría:  {post?.categories}
            </Text>
            <Text style={styles.brand}>
              Marca: {post?.brand}
            </Text>
            <Text style={styles.duration}>
              Duración:  {post?.duration! > 1 ? `${post?.duration} Semanas` : `${post?.duration} Semana`}
            </Text>
            <Text style={styles.description_title}>
              Acción / Campaña / Idea
            </Text>
            <Text style={styles.description}>
              {post?.description}
            </Text>
            <Text style={styles.core_target_title}>
              Core Target
            </Text>
            <Text style={styles.core_target}>
              {post?.core_target}
            </Text>
            <Text style={styles.core_target_title}>
              Resultados
            </Text>
            <Text style={styles.core_target}>
              {post?.result}
            </Text>
            <View style={styles.image_container}>
              {post?.images.map((url) => (
                <Image
                  src={url}
                  style={styles.image}
                />
              ))}
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}