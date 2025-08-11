import React, { useState, useEffect } from 'react'
import { useStepContext } from '~/context/step-context'
import Box from '@mui/material/Box'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import studyCategoryImg from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'

const categories = [
  { _id: 'cat1', name: 'Mathematics' },
  { _id: 'cat2', name: 'Languages' },
  { _id: 'cat3', name: 'Computer Science' },
  { _id: 'cat4', name: 'Music' },
  { _id: 'cat5', name: 'History' }
]
const subjects = [
  { _id: 'sub1', name: 'Algebra', categoryId: 'cat1' },
  { _id: 'sub2', name: 'Geometry', categoryId: 'cat1' },
  { _id: 'sub3', name: 'Calculus', categoryId: 'cat1' },
  { _id: 'sub4', name: 'Statistics', categoryId: 'cat1' },
  { _id: 'sub5', name: 'English', categoryId: 'cat2' },
  { _id: 'sub6', name: 'French', categoryId: 'cat2' },
  { _id: 'sub7', name: 'Spanish', categoryId: 'cat2' },
  { _id: 'sub8', name: 'Programming', categoryId: 'cat3' },
  { _id: 'sub9', name: 'Algorithms', categoryId: 'cat3' },
  { _id: 'sub10', name: 'Web Development', categoryId: 'cat3' },
  { _id: 'sub11', name: 'Piano', categoryId: 'cat4' },
  { _id: 'sub12', name: 'Guitar', categoryId: 'cat4' },
  { _id: 'sub13', name: 'Music Theory', categoryId: 'cat4' },
  { _id: 'sub14', name: 'World History', categoryId: 'cat5' },
  { _id: 'sub15', name: 'European History', categoryId: 'cat5' },
  { _id: 'sub16', name: 'American History', categoryId: 'cat5' }
]

const SubjectsStep = ({ btnsBox }) => {
  const { stepData, handleStepData } = useStepContext()
  const subjectsFromContext = stepData['subjects'] || []

  const [addedSubjects, setAddedSubjects] = useState(
    subjectsFromContext.map((item) => item.subject)
  )
  const [selectedCategory, setSelectedCategory] = useState(
    subjectsFromContext[0]?.category?._id || ''
  )
  const [selectedSubject, setSelectedSubject] = useState('')

  useEffect(() => {
    setSelectedSubject('')
  }, [selectedCategory])

  useEffect(() => {
    if (!selectedCategory) return
    handleStepData(
      'subjects',
      addedSubjects.map((subj) => ({
        category: categories.find(
          (cat) =>
            cat._id === selectedCategory ||
            cat.id === selectedCategory ||
            cat.name === selectedCategory
        ),
        subject: subj
      }))
    )
  }, [addedSubjects, selectedCategory, handleStepData])

  return (
    <Box sx={{ ...styles.container, alignItems: 'flex-start' }}>
      <Box>
        <img
          alt='Study Category'
          src={studyCategoryImg}
          style={{ maxWidth: 320, marginBottom: 24 }}
        />
      </Box>
      <Box
        sx={{
          ...styles.rigthBox,
          maxWidth: 380,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 520,
          marginLeft: 0
        }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              marginBottom: 16,
              color: 'black',
              fontSize: 16,
              fontWeight: 300
            }}
          >
            Velit officia consequat duis enim velit mollit. Other categories you
            can add in your account settings later.
          </div>
          <FormControl sx={{ width: '100%', marginBottom: 3 }}>
            <InputLabel id='category-label'>Main Tutoring Category</InputLabel>
            <Select
              label='Main Tutoring Category'
              labelId='category-label'
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setAddedSubjects([])
                setSelectedSubject('')
                handleStepData('subjects', [])
              }}
              value={selectedCategory}
            >
              {categories.map((cat) => (
                <MenuItem
                  key={cat._id || cat.id || cat.name}
                  value={cat._id || cat.id || cat.name}
                >
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: '100%', marginBottom: 3 }}>
            <InputLabel id='subject-label'>Subject</InputLabel>
            <Select
              label='Subject'
              labelId='subject-label'
              onChange={(e) => {
                setSelectedSubject(e.target.value)
              }}
              value={selectedSubject}
            >
              {subjects
                .filter((sub) => sub.categoryId === selectedCategory)
                .map((sub) => (
                  <MenuItem
                    key={sub._id || sub.id || sub.name}
                    value={sub._id || sub.id || sub.name}
                  >
                    {sub.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <button
            disabled={
              !selectedSubject ||
              addedSubjects.some((s) => s._id === selectedSubject)
            }
            onClick={() => {
              if (
                !selectedSubject ||
                addedSubjects.some((s) => s._id === selectedSubject)
              )
                return
              const subjectObj = subjects.find(
                (sub) =>
                  sub._id === selectedSubject ||
                  sub.id === selectedSubject ||
                  sub.name === selectedSubject
              )
              const newSubjects = [...addedSubjects, subjectObj]
              setAddedSubjects(newSubjects)
              setSelectedSubject('')
              handleStepData(
                'subjects',
                newSubjects.map((sub) => ({
                  category: categories.find(
                    (cat) =>
                      cat._id === selectedCategory ||
                      cat.id === selectedCategory ||
                      cat.name === selectedCategory
                  ),
                  subject: sub
                }))
              )
            }}
            style={{
              width: '100%',
              padding: '14px 0',
              marginBottom: 14,
              borderRadius: 8,
              border: 'none',
              background: '#F4F6F8',
              color: 'black',
              fontWeight: 600,
              fontSize: 16,
              cursor:
                selectedSubject &&
                !addedSubjects.some((s) => s._id === selectedSubject)
                  ? 'pointer'
                  : 'not-allowed',
              transition: 'background 0.2s',
              opacity:
                selectedSubject &&
                !addedSubjects.some((s) => s._id === selectedSubject)
                  ? 1
                  : 0.5
            }}
          >
            Add one more subject
          </button>
          <div style={{ marginBottom: 16 }}>
            {addedSubjects.map((sub) => (
              <span
                key={sub._id}
                style={{
                  display: 'inline-block',
                  background: '#e3e6e8',
                  color: 'black',
                  borderRadius: 16,
                  padding: '4px 12px',
                  marginRight: 8,
                  marginBottom: 1,
                  fontSize: 15
                }}
              >
                {sub.name}
                <span
                  onClick={() => {
                    const filtered = addedSubjects.filter(
                      (s) => s._id !== sub._id
                    )
                    setAddedSubjects(filtered)
                    handleStepData(
                      'subjects',
                      filtered.map((subj) => ({
                        category: categories.find(
                          (cat) =>
                            cat._id === selectedCategory ||
                            cat.id === selectedCategory ||
                            cat.name === selectedCategory
                        ),
                        subject: subj
                      }))
                    )
                  }}
                  style={{ marginLeft: 8, cursor: 'pointer', color: '#888' }}
                >
                  ×
                </span>
              </span>
            ))}
          </div>
        </div>
        <div style={{ width: '100%', marginTop: 32 }}>{btnsBox}</div>
      </Box>
    </Box>
  )
}

export default SubjectsStep
