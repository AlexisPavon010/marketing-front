import { useState, useEffect } from 'react';
import { Steps } from 'antd';
import moment from 'moment';

export const StepsComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([
    {
      title: 'Inscripción',
      startDate: '14/02/23',
      endDate: '14/03/23',
      descripcion: ''
    },
    {
      title: 'Primer Juzgamiento',
      startDate: '15/03/23',
      endDate: '29/03/23',
    },
    {
      title: 'Segundo Juzgamiento',
      startDate: '10/04/23',
      endDate: '10/04/23'
    },
    {
      title: 'Resultados',
      startDate: '11/04/23',
      endDate: '11/04/23',
    },
  ]);

  useEffect(() => {
    const current = steps.findIndex((step) => {
      const now = moment()
      const startDate = moment(step.startDate, 'DD/MM/YY').startOf('day')
      const endDate = moment(step.endDate, 'DD/MM/YY').endOf('day')
      if (now.isBetween(startDate, endDate)) return true
      return false
    })
    setCurrentStep(current === -1 ? 0 : current);
  }, [steps]);

  return (
    <Steps current={currentStep}>
      {steps.map((step) => (
        <Steps.Step key={step.title} title={step.title} />
      ))}
    </Steps>
  );
};