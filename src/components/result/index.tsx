import moment from 'moment'
import LicensePlate from '@app/components/licensePlate'
import Style from './style'

interface ResultProps {
  data: any
}

const Result = ({ data }: ResultProps) => {
  const formatStr = 'MMM DD, yyyy - HH:mm'

  return (
    <Style>
      {data.serial ? (
        <>
          {data.isMistake ? <div className='mistake-stamp'>MISTAKE</div> : ''}
          <div
            className={`${data.isMistake ? 'mistake-result' : ''} result-wrap`}
          >
            <div className='serial'>
              <h3>Serial:</h3>
              <div>{data.serial}</div>
            </div>
            <LicensePlate licensePlate={data.dataCache.vehicle?.licensePlate} />
            <div className='weight-row'>
              <div className='weight-number'>1</div>
              <div>
                <div className='weight-time'>
                  {moment(+data.weights[0]?.createdAt).format(formatStr)}
                </div>
                <div className='weight-value'>{data.weights[0]?.weight} KG</div>
              </div>
            </div>
            {data.weights.length && (
              <>
                <div className='weight-row'>
                  <div className='weight-number'>2</div>
                  <div>
                    <div className='weight-time'>
                      {moment(+data.weights[1]?.createdAt).format(formatStr)}
                    </div>
                    <div className='weight-value'>
                      {data.weights[1].weight} KG
                    </div>
                  </div>
                </div>
                <div className='weight-row'>
                  <div className='weight-number'>▼</div>
                  <div>
                    <div>
                      <div className='weight-time'>
                        {moment(+data.weights[1]?.createdAt).from(
                          +data.weights[0]?.createdAt
                        )}
                      </div>
                      <div className='weight-value weight-result'>
                        {`${Math.abs(
                          +data.weights[1].weight - +data.weights[0].weight
                        )} KG`}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <div>
          <h3>Result Not Found</h3>
          <p>Please try again later.</p>
        </div>
      )}
    </Style>
  )
}

export default Result
